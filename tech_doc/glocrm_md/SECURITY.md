# SECURITY SETUP GUIDE

## 🚨 CRITICAL: You Must Change These Credentials IMMEDIATELY

The credentials you shared are now compromised and must be changed:

### 1. Server Access (SSH)
```bash
# SSH to your server
ssh root@5.180.148.92

# Change root password immediately
passwd

# Better: Disable root login and create a service user
useradd -m -s /bin/bash glocrm
usermod -aG sudo glocrm
su - glocrm

# Set up SSH key authentication (more secure than passwords)
mkdir -p ~/.ssh
chmod 700 ~/.ssh
# Add your public key to ~/.ssh/authorized_keys
```

### 2. MariaDB Security
```bash
# Connect to MariaDB
mysql -u root -p

# Change root password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NEW_STRONG_PASSWORD';

# Create dedicated database user (NEVER use root for applications)
CREATE DATABASE glocrm_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'glocrm_user'@'localhost' IDENTIFIED BY 'STRONG_DB_PASSWORD';
GRANT ALL PRIVILEGES ON glocrm_production.* TO 'glocrm_user'@'localhost';
FLUSH PRIVILEGES;

# Remove remote root access
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
FLUSH PRIVILEGES;
```

## 🔒 GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets (NEVER put real values in code):

```
SSH_PRIVATE_KEY=your_ssh_private_key_content
SERVER_IP=5.180.148.92
SERVER_USER=glocrm  # NOT root!
DB_HOST=localhost
DB_USER=glocrm_user  # NOT root!
DB_PASSWORD=your_strong_db_password
DB_NAME=glocrm_production
SECRET_KEY=generate_random_32_character_string
```

## 🛡️ Server Security Hardening

### 1. Firewall Configuration
```bash
# Install and configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. SSH Security
```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Add these secure settings:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AllowUsers glocrm
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2

# Restart SSH service
sudo systemctl restart ssh
```

### 3. System Updates
```bash
# Keep system updated
sudo apt update && sudo apt upgrade -y

# Install security updates automatically
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

## 📊 Database Migration Script

Create this script to migrate from SQLite to MariaDB:

```python
# migrate_to_mariadb.py
import sqlite3
import pymysql
import os
from datetime import datetime

def migrate_data():
    # SQLite connection (source)
    sqlite_conn = sqlite3.connect('whatsapp_chats.db')
    sqlite_cursor = sqlite_conn.cursor()
    
    # MariaDB connection (destination)
    mysql_conn = pymysql.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASSWORD'),
        database=os.environ.get('DB_NAME'),
        charset='utf8mb4'
    )
    mysql_cursor = mysql_conn.cursor()
    
    # Create tables in MariaDB
    mysql_cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sender_name VARCHAR(255) NOT NULL,
            sender_phone VARCHAR(20),
            date_time DATETIME NOT NULL,
            message TEXT NOT NULL,
            extracted_phones TEXT,
            source_file VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_sender (sender_name),
            INDEX idx_date (date_time),
            INDEX idx_phone (sender_phone)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ''')
    
    # Migrate data
    sqlite_cursor.execute('SELECT * FROM messages')
    rows = sqlite_cursor.fetchall()
    
    for row in rows:
        mysql_cursor.execute('''
            INSERT INTO messages 
            (sender_name, sender_phone, date_time, message, extracted_phones, source_file)
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', row[1:])  # Skip SQLite's id
    
    mysql_conn.commit()
    print(f"Migrated {len(rows)} messages to MariaDB")
    
    # Close connections
    sqlite_conn.close()
    mysql_conn.close()

if __name__ == '__main__':
    migrate_data()
```

## 🚀 Safe Deployment Process

### 1. Set Up SSH Key Authentication
```bash
# Generate SSH key pair (on your local machine)
ssh-keygen -t rsa -b 4096 -C "glocrm-deployment"

# Copy public key to server
ssh-copy-id glocrm@5.180.148.92
```

### 2. Configure GitHub Secrets
- Go to your repository settings
- Add all the secrets listed above
- NEVER commit real credentials to code

### 3. Deploy Using GitHub Actions
- Go to Actions tab in your repository
- Select "Deploy to Production Server"
- Click "Run workflow"

## ⚠️ IMPORTANT WARNINGS

1. **NEVER use root user** for application deployment
2. **CHANGE ALL PASSWORDS** immediately
3. **Use SSH keys** instead of passwords
4. **Enable firewall** and close unnecessary ports
5. **Regular backups** of database and application
6. **Monitor logs** for suspicious activity
7. **Keep system updated** with security patches

## 📞 Emergency Procedures

If you suspect compromise:
1. Change all passwords immediately
2. Check system logs: `sudo journalctl -f`
3. Review database access: `SELECT user, host FROM mysql.user;`
4. Monitor network connections: `sudo netstat -tulpn`
5. Check running processes: `ps aux | grep -E "(python|mysql|nginx)"`

---
**Remember: Security is not optional in production environments!**
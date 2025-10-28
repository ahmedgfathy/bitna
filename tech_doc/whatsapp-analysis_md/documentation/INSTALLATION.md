# Installation Guide

## System Requirements

- **Operating System:** Linux (Ubuntu 20.04+ recommended)
- **Python:** 3.8+
- **Database:** MariaDB 10.4+ or MySQL 8.0+
- **Memory:** 2GB RAM minimum, 4GB recommended
- **Storage:** 10GB+ (depends on message volume)

## Step 1: Server Setup

### Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### Install Python and Dependencies
```bash
sudo apt install python3 python3-pip python3-venv
sudo apt install mariadb-server mariadb-client
```

### Start and Secure Database
```bash
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
```

## Step 2: Database Configuration

### Create Database and User
```sql
sudo mysql -u root -p

CREATE DATABASE whatsapp_analysis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'whatsapp_user'@'localhost' IDENTIFIED BY 'WhatsApp2025#Secure!';
GRANT ALL PRIVILEGES ON whatsapp_analysis.* TO 'whatsapp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 3: Application Setup

### Clone/Upload Project Files
```bash
cd /var/www/
sudo mkdir whatsapp-analysis
sudo chown $USER:$USER whatsapp-analysis/
cd whatsapp-analysis/

# Upload your project files here
```

### Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Python Dependencies
```bash
pip install -r requirements.txt
```

## Step 4: Configuration

### Environment Variables
Create `.env` file:
```bash
nano .env
```

Add configuration:
```env
FLASK_ENV=production
DATABASE_HOST=localhost
DATABASE_USER=whatsapp_user
DATABASE_PASSWORD=WhatsApp2025#Secure!
DATABASE_NAME=whatsapp_analysis
SECRET_KEY=your-secret-key-here
```

### Create Required Directories
```bash
mkdir -p uploads logs
chmod 755 uploads logs
```

## Step 5: Initialize Database

### Run Database Migration
```bash
python web_app_production.py
# This will create the required tables
# Press Ctrl+C after tables are created
```

### Create Admin User
```bash
python -c "
from web_app_production import *
import bcrypt

conn = get_db_connection()
cursor = conn.cursor()

password_hash = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
cursor.execute('INSERT INTO users (phone, password_hash, is_admin) VALUES (%s, %s, %s)', 
               ('01000000000', password_hash, True))
conn.commit()
conn.close()
print('Admin user created: 01000000000 / admin123')
"
```

## Step 6: Web Server Setup (Nginx)

### Install Nginx
```bash
sudo apt install nginx
```

### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/whatsapp-analysis
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files
    location /static {
        alias /var/www/whatsapp-analysis/static;
    }
    
    # File uploads
    client_max_body_size 100M;
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/whatsapp-analysis /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 7: Process Management (Systemd)

### Create Service File
```bash
sudo nano /etc/systemd/system/whatsapp-analysis.service
```

Add configuration:
```ini
[Unit]
Description=WhatsApp Real Estate Analysis
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/whatsapp-analysis
Environment=PATH=/var/www/whatsapp-analysis/venv/bin
ExecStart=/var/www/whatsapp-analysis/venv/bin/python web_app_production.py
Restart=always

[Install]
WantedBy=multi-user.target
```

### Start Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable whatsapp-analysis
sudo systemctl start whatsapp-analysis
sudo systemctl status whatsapp-analysis
```

## Step 8: SSL Certificate (Optional)

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### Get Certificate
```bash
sudo certbot --nginx -d your-domain.com
```

## Step 9: Firewall Configuration

### Configure UFW
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## Step 10: Verification

### Test Installation
1. Visit `http://your-domain.com`
2. Login with admin credentials: `01000000000` / `admin123`
3. Upload a test WhatsApp export file
4. Verify message extraction and analysis

### Check Logs
```bash
# Application logs
sudo journalctl -u whatsapp-analysis -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Maintenance

### Regular Backups
```bash
# Database backup
mysqldump -u whatsapp_user -p whatsapp_analysis > backup_$(date +%Y%m%d).sql

# File backup
tar -czf backup_files_$(date +%Y%m%d).tar.gz /var/www/whatsapp-analysis/uploads/
```

### Log Rotation
```bash
sudo nano /etc/logrotate.d/whatsapp-analysis
```

Add:
```
/var/www/whatsapp-analysis/logs/*.log {
    daily
    rotate 30
    compress
    missingok
    notifempty
    copytruncate
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MariaDB service: `sudo systemctl status mariadb`
   - Verify credentials in configuration
   - Check firewall settings

2. **Permission Errors**
   - Set correct ownership: `sudo chown -R www-data:www-data /var/www/whatsapp-analysis/`
   - Check directory permissions: `chmod 755 uploads/ logs/`

3. **Memory Issues**
   - Increase server memory
   - Optimize batch processing in scripts

4. **File Upload Errors**
   - Check `client_max_body_size` in Nginx
   - Verify upload directory permissions
   - Monitor disk space

### Performance Tuning

1. **Database Optimization**
   ```sql
   CREATE INDEX idx_message_content ON messages(message_content(100));
   CREATE INDEX idx_sender_name ON messages(sender_name);
   CREATE INDEX idx_area_sector ON messages(area_number, sector_number);
   ```

2. **Python Optimization**
   - Use gunicorn for production: `pip install gunicorn`
   - Update service file: `ExecStart=/var/www/whatsapp-analysis/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 web_app_production:app`

3. **Nginx Caching**
   ```nginx
   location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```
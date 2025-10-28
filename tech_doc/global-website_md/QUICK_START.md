# Quick Deployment Guide for www.glomartrealestates.com

## 🚀 Deploy Your Website in 3 Steps

### Step 1: Build and Deploy
```bash
cd /Users/ahmedgomaa/Downloads/global-website

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
- ✅ Build the Next.js application
- ✅ Upload files to server (5.180.148.92)
- ✅ Install dependencies on server
- ✅ Start application with PM2
- ✅ Upload Nginx configuration

### Step 2: Configure Nginx (On Server)
```bash
# SSH into server
ssh root@5.180.148.92

# Enable the Nginx site
ln -s /etc/nginx/sites-available/glomartrealestates.conf /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# If test passes, reload Nginx
systemctl reload nginx
```

### Step 3: Setup SSL (If Not Already Installed)
```bash
# Install Certbot (if not already installed)
apt install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d glomartrealestates.com -d www.glomartrealestates.com
```

## ✅ That's It!

Your website will be live at:
- **https://www.glomartrealestates.com**
- **https://glomartrealestates.com**

## 📊 Monitoring

```bash
# Check application status
ssh root@5.180.148.92 'pm2 status'

# View logs
ssh root@5.180.148.92 'pm2 logs global-website'

# Restart application
ssh root@5.180.148.92 'pm2 restart global-website'
```

## 🔧 Database Connection

The application will connect to MariaDB locally on the server:
- Host: `localhost` (fast and secure)
- Database: `django_db_glomart_rs`
- Port: `3306`

## ⚠️ Important Notes

- ✅ Deployment is **safe** - won't affect existing services
- ✅ iRedMail, Roundcube, Django CRM remain untouched
- ✅ Uses port **3002** internally (no conflicts)
- ✅ Nginx handles SSL and proxies to Next.js

## 🆘 Need Help?

If something goes wrong:
```bash
# Check PM2 logs
ssh root@5.180.148.92 'pm2 logs global-website --err'

# Check Nginx logs
ssh root@5.180.148.92 'tail -f /var/log/nginx/glomartrealestates-error.log'

# Stop application
ssh root@5.180.148.92 'pm2 stop global-website'
```

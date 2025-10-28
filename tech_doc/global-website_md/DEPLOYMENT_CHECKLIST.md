# Deployment Checklist for 5.180.148.92

## Pre-Deployment Checks

### 1. Existing Services on Server
- ✅ iRedMail (mail server) - **DO NOT TOUCH**
- ✅ Roundcube (webmail) - **DO NOT TOUCH**
- ✅ Django CRM application - **DO NOT TOUCH**
- ✅ Nginx (web server) - **Will add new config without modifying existing**
- ✅ Python applications - **DO NOT TOUCH**

### 2. Port Allocation
- Port 80: Nginx (HTTP)
- Port 443: Nginx (HTTPS)
- Port 25/587/465: iRedMail (SMTP)
- Port 143/993: iRedMail (IMAP)
- Port 110/995: iRedMail (POP3)
- **Port 3002: Global Website Next.js** ← New application

### 3. Deployment Steps

1. **Build application locally:**
   ```bash
   cd /Users/ahmedgomaa/Downloads/global-website
   pnpm run build
   ```

2. **Run deployment script:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **On the server, configure Nginx:**
   ```bash
   ssh root@5.180.148.92
   
   # Edit the Nginx config
   nano /etc/nginx/sites-available/global-website.conf
   
   # Choose ONE option:
   # Option A: Subdomain (global.yourdomain.com)
   # Option B: Path (/global-website)
   
   # Enable the site (if using sites-enabled)
   ln -s /etc/nginx/sites-available/global-website.conf /etc/nginx/sites-enabled/
   
   # Test configuration
   nginx -t
   
   # If test passes, reload Nginx
   systemctl reload nginx
   ```

4. **Verify application is running:**
   ```bash
   ssh root@5.180.148.92 'pm2 status'
   ssh root@5.180.148.92 'curl http://localhost:3002'
   ```

### 4. Database Configuration on Server

The `.env.production` file will use `localhost` for database:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_NAME=django_db_glomart_rs
```

This is PERFECT because:
- ✅ No network latency
- ✅ No firewall issues
- ✅ More secure (no external access needed)

### 5. Post-Deployment Checks

- [ ] Application running: `pm2 status`
- [ ] Database connected: Check logs with `pm2 logs global-website`
- [ ] Nginx forwarding works: Visit your domain/subdomain
- [ ] iRedMail still working: Send/receive test email
- [ ] Roundcube accessible: Check webmail
- [ ] Django CRM still working: Visit CRM app

### 6. Rollback Plan

If something goes wrong:
```bash
ssh root@5.180.148.92

# Stop Next.js app
pm2 stop global-website
pm2 delete global-website

# Remove Nginx config
rm /etc/nginx/sites-enabled/global-website.conf
systemctl reload nginx

# Remove application files (optional)
rm -rf /var/www/global-website
```

### 7. Monitoring

```bash
# Watch logs in real-time
ssh root@5.180.148.92 'pm2 logs global-website --lines 100'

# Check memory usage
ssh root@5.180.148.92 'pm2 monit'

# Application metrics
ssh root@5.180.148.92 'pm2 show global-website'
```

## Important Notes

⚠️ **The deployment is designed to be NON-INVASIVE:**
- Uses separate port (3002)
- Separate directory (/var/www/global-website)
- Separate PM2 process
- Optional Nginx configuration (doesn't overwrite)
- Does NOT modify existing services

✅ **Safe to deploy** without affecting:
- Email services
- Webmail
- CRM
- Any other running applications

# SSL Certificate and Database Connection Fix

## Issues Resolved

### 1. SSL Certificate Error (ERR_CERT_COMMON_NAME_INVALID)
**Problem:** After updating DNS to point to the new server, the site showed SSL certificate error.

**Solution:**
- Created temporary HTTP-only Nginx configuration
- Ran Certbot to install Let's Encrypt SSL certificates for both domains:
  - glomartrealestates.com
  - www.glomartrealestates.com
- Certbot automatically updated Nginx configuration with SSL settings

**Commands Used:**
```bash
# Upload temporary HTTP config
scp nginx-glomartrealestates-http.conf root@5.180.148.92:/etc/nginx/sites-available/glomartrealestates.conf

# Enable site and reload Nginx
ssh root@5.180.148.92 'ln -sf /etc/nginx/sites-available/glomartrealestates.conf /etc/nginx/sites-enabled/glomartrealestates.conf && nginx -t && systemctl reload nginx'

# Install SSL certificates
ssh root@5.180.148.92 'certbot --nginx -d glomartrealestates.com -d www.glomartrealestates.com --non-interactive --agree-tos --email admin@glomartrealestates.com --redirect'
```

**Result:**
✅ SSL certificates installed successfully
✅ Certificate expires: 2026-01-19
✅ Automatic renewal configured
✅ HTTPS redirects enabled

---

### 2. Database Connection Error (ECONNREFUSED ::1:3306)
**Problem:** Next.js application couldn't connect to MariaDB, showing IPv6 connection attempts to `::1:3306` instead of IPv4 `127.0.0.1:3306`.

**Root Causes:**
1. Node.js was resolving `localhost` to IPv6 `::1` instead of IPv4
2. Password with special characters (`#` and `&&`) was not properly quoted in `.env.production`

**Solutions:**

#### 2.1 Force IPv4 Connection
Modified `lib/mcp/mariadb-manager.js`:
```javascript
this.config = {
  host: process.env.DB_HOST === 'localhost' ? '127.0.0.1' : process.env.DB_HOST, // Force IPv4
  // ... rest of config
};
```

#### 2.2 Fix Password Quoting
Updated `.env.production`:
```bash
# Before (incorrect)
DB_PASSWORD=ZeroCall20!@HH##1655&&

# After (correct)
DB_PASSWORD="ZeroCall20!@HH##1655&&"
```

The `#` character was being treated as a comment delimiter, and `&&` was being interpreted as a shell operator.

#### 2.3 Update PM2 Ecosystem Config
Modified `ecosystem.config.js` to properly load environment variables from `.env.production`:
```javascript
const fs = require('fs');
const path = require('path');

// Load .env.production file
const envFile = path.join(__dirname, '.env.production');
const envConfig = {};

if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      envConfig[key] = value;
    }
  });
}

module.exports = {
  apps: [{
    name: 'global-website',
    // ...
    env: {
      NODE_ENV: 'production',
      PORT: 3002,
      ...envConfig  // Load all env vars from .env.production
    }
  }]
};
```

**Commands Used:**
```bash
# Fix database manager
scp lib/mcp/mariadb-manager.js root@5.180.148.92:/var/www/global-website/lib/mcp/

# Fix password in .env.production
ssh root@5.180.148.92 'sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=\"ZeroCall20!@HH##1655\&\&\"/" /var/www/global-website/.env.production'

# Update ecosystem config (via SSH heredoc)
ssh root@5.180.148.92 'cat > /var/www/global-website/ecosystem.config.js << EOF
...config content...
EOF'

# Rebuild Next.js
ssh root@5.180.148.92 'cd /var/www/global-website && rm -rf .next && pnpm run build'

# Restart PM2
ssh root@5.180.148.92 'cd /var/www/global-website && pm2 delete global-website && pm2 start ecosystem.config.js && pm2 save'
```

**Result:**
✅ Database connection successful
✅ API returning real property data (3,229 properties)
✅ Home page loading properties correctly

---

## Verification

### Test SSL Certificate
```bash
curl -I https://www.glomartrealestates.com
# Should return 200 OK with valid SSL
```

### Test Database Connection
```bash
# API endpoint
curl "https://www.glomartrealestates.com/api/properties?action=getAll&limit=1"

# Should return:
{
  "success": true,
  "properties": [{...}],
  "totalProperties": 3229
}
```

### Check PM2 Status
```bash
ssh root@5.180.148.92 'pm2 status'
# Should show global-website as "online"
```

### Check Logs
```bash
ssh root@5.180.148.92 'pm2 logs global-website --lines 20'
# Should show successful MariaDB connections, no errors
```

---

## Production URLs

- **Main Site:** https://www.glomartrealestates.com
- **Alternative:** https://glomartrealestates.com
- **API Endpoint:** https://www.glomartrealestates.com/api/properties
- **Server:** mail.glomartrealestates.com (5.180.148.92)
- **Application Port:** 3002 (proxied through Nginx)

---

## SSL Certificate Details

- **Certificate Authority:** Let's Encrypt
- **Domains Covered:**
  - glomartrealestates.com
  - www.glomartrealestates.com
- **Certificate Location:** `/etc/letsencrypt/live/glomartrealestates.com/`
- **Expiry Date:** January 19, 2026
- **Auto-Renewal:** Enabled (Certbot manages this automatically)

---

## Database Configuration

- **Host:** 127.0.0.1 (forced IPv4)
- **Port:** 3306
- **Database:** django_db_glomart_rs
- **Total Properties:** 3,229
- **Connection Method:** mysql2 connection pool
- **Timeout:** 10 seconds
- **Connection Limit:** 10 connections

---

## Important Notes

1. **Password Quoting:** Always quote passwords with special characters in `.env` files
2. **IPv6 vs IPv4:** Node.js may prefer IPv6 when resolving `localhost`, use `127.0.0.1` explicitly
3. **PM2 Environment:** PM2 doesn't automatically load `.env` files, must be configured in `ecosystem.config.js`
4. **SSL Auto-Renewal:** Certbot has set up automatic renewal, no manual intervention needed
5. **Next.js Cache:** After code changes, rebuild with `rm -rf .next && pnpm run build`

---

## Files Modified

1. `lib/mcp/mariadb-manager.js` - Force IPv4 connection
2. `.env.production` - Quote passwords with special characters
3. `ecosystem.config.js` - Load environment variables properly
4. `/etc/nginx/sites-available/glomartrealestates.conf` - SSL configuration (by Certbot)

---

## Deployment Status

✅ Application deployed and running
✅ SSL certificates installed and valid
✅ Database connected and functional
✅ PM2 configured for auto-restart
✅ Nginx reverse proxy configured
✅ HTTPS redirects enabled
✅ Auto-renewal configured for SSL

---

**Deployment Date:** October 21, 2025
**Deployed By:** Ahmed Gomaa
**Status:** Production Ready ✅

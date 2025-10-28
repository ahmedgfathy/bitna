# SSL Certificate Setup Guide
## arafa.contaboo.com - Let's Encrypt with Certbot

---

## 🔒 Overview

Your Real Estate CRM deployment automatically installs and configures SSL certificates using **Let's Encrypt** and **Certbot** for Apache.

**Domain:** arafa.contaboo.com  
**SSL Provider:** Let's Encrypt (Free, Trusted)  
**Auto-Renewal:** Yes (Every 60 days)  
**Certificate Validity:** 90 days  

---

## ✅ What Gets Configured Automatically

When you run `./scripts/2_deploy_to_server.sh`, the deployment automatically:

1. ✅ **Installs Certbot** and Apache plugin
2. ✅ **Obtains SSL Certificate** for:
   - arafa.contaboo.com
   - www.arafa.contaboo.com
3. ✅ **Configures Apache** for HTTPS (port 443)
4. ✅ **Enables HTTP → HTTPS Redirect** (all traffic uses SSL)
5. ✅ **Enables HSTS** (HTTP Strict Transport Security)
6. ✅ **Configures OCSP Stapling** (faster SSL handshake)
7. ✅ **Sets Up Auto-Renewal** (systemd timer checks twice daily)

---

## 🚀 Quick Start

### Deployment Includes SSL
Simply run the deployment script:
```bash
./scripts/1_prepare_deployment.sh
./scripts/2_deploy_to_server.sh
```

SSL is automatically configured as **Step 11/11** of the deployment.

---

## 🛠️ SSL Management Script

Use the interactive SSL management script:

```bash
./scripts/5_manage_ssl.sh
```

### Menu Options:

**1. Check SSL Certificate Status**
- View current certificate details
- Check expiration date
- See which domains are covered

**2. Install/Renew SSL Certificate**
- Fresh installation of SSL certificate
- Renew existing certificate
- Configure Apache automatically

**3. Test SSL Certificate Renewal**
- Dry run - doesn't actually renew
- Verifies renewal will work
- Checks configuration

**4. View Certificate Details**
- Complete certificate information
- File locations
- Validity dates

**5. Check Auto-Renewal Status**
- Verify systemd timer is active
- See next scheduled renewal
- Check renewal history

**6. Force Certificate Renewal**
- Manually renew before expiration
- Use only if needed

**7. Revoke SSL Certificate**
- Remove SSL certificate
- Use for domain changes

---

## 📋 Manual SSL Commands

### Check Certificate Status
```bash
ssh root@38.242.250.92
certbot certificates
```

**Output Example:**
```
Certificate Name: arafa.contaboo.com
  Domains: arafa.contaboo.com www.arafa.contaboo.com
  Expiry Date: 2026-01-19 10:25:30+00:00 (VALID: 89 days)
  Certificate Path: /etc/letsencrypt/live/arafa.contaboo.com/fullchain.pem
  Private Key Path: /etc/letsencrypt/live/arafa.contaboo.com/privkey.pem
```

### Test Certificate Renewal (Dry Run)
```bash
ssh root@38.242.250.92
certbot renew --dry-run
```

This tests the renewal process without actually renewing.

### Force Manual Renewal
```bash
ssh root@38.242.250.92
certbot renew --force-renewal
systemctl reload apache2
```

⚠️ **Warning:** Only use if needed. Automatic renewal is preferred.

### Check Auto-Renewal Timer
```bash
ssh root@38.242.250.92
systemctl status certbot.timer
systemctl list-timers certbot.timer
```

---

## 📁 Certificate File Locations

All SSL certificates are stored in:
```
/etc/letsencrypt/live/arafa.contaboo.com/
```

**Files:**
- `fullchain.pem` - Complete certificate chain (public)
- `privkey.pem` - Private key (keep secure!)
- `cert.pem` - Domain certificate only
- `chain.pem` - Certificate Authority chain

**Apache Configuration:**
```
/etc/apache2/sites-enabled/000-default-le-ssl.conf
```

---

## 🔍 Verify SSL Installation

### Test from Local Machine

```bash
# Test HTTPS connection
curl -I https://arafa.contaboo.com

# Check certificate details
openssl s_client -connect arafa.contaboo.com:443 -servername arafa.contaboo.com </dev/null

# Extract expiration date
echo | openssl s_client -servername arafa.contaboo.com -connect arafa.contaboo.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Test in Browser

1. Visit: https://arafa.contaboo.com
2. Look for **padlock icon** in address bar
3. Click padlock → View certificate
4. Verify:
   - ✅ Issued by: Let's Encrypt
   - ✅ Valid dates
   - ✅ Domain matches

### SSL Labs Test

Get an A+ SSL rating:
```
https://www.ssllabs.com/ssltest/analyze.html?d=arafa.contaboo.com
```

---

## 🔄 Automatic Renewal

### How It Works

Certbot automatically renews certificates:
- **Check Frequency:** Twice daily (via systemd timer)
- **Renewal Trigger:** 30 days before expiration
- **Certificate Validity:** 90 days
- **Action After Renewal:** Apache automatically reloaded

### Verify Auto-Renewal is Active

```bash
ssh root@38.242.250.92

# Check timer status
systemctl status certbot.timer

# Should show: Active: active (waiting)

# See next run time
systemctl list-timers certbot.timer
```

### Test Auto-Renewal

```bash
ssh root@38.242.250.92
certbot renew --dry-run
```

If successful, you'll see:
```
Congratulations, all simulated renewals succeeded!
```

---

## 🐛 Troubleshooting

### Problem: Certificate Not Working

**Check DNS Configuration:**
```bash
# From local machine
dig arafa.contaboo.com +short
# Should return: 38.242.250.92

# Also check www subdomain
dig www.arafa.contaboo.com +short
```

**Verify Ports are Open:**
```bash
ssh root@38.242.250.92

# Check port 80 (HTTP)
netstat -tlnp | grep :80

# Check port 443 (HTTPS)
netstat -tlnp | grep :443
```

**Check Apache is Running:**
```bash
systemctl status apache2
```

### Problem: Renewal Fails

**Check Certbot Logs:**
```bash
ssh root@38.242.250.92
tail -50 /var/log/letsencrypt/letsencrypt.log
```

**Common Issues:**
1. **Port 80 blocked** - Certbot needs port 80 for validation
2. **Apache misconfigured** - Run `apache2ctl configtest`
3. **DNS not updated** - Domain must point to server IP

**Fix:**
```bash
# Test Apache config
apache2ctl configtest

# Restart Apache
systemctl restart apache2

# Try renewal again
certbot renew --verbose
```

### Problem: Mixed Content Warnings

If some resources load over HTTP instead of HTTPS:

**Update Django Settings:**
```python
# In settings_production.py
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
```

**Update URLs in Templates:**
```html
<!-- Change -->
<script src="http://example.com/script.js"></script>

<!-- To -->
<script src="https://example.com/script.js"></script>

<!-- Or use protocol-relative URLs -->
<script src="//example.com/script.js"></script>
```

### Problem: Certificate Expired

If you forgot to renew (shouldn't happen with auto-renewal):

```bash
ssh root@38.242.250.92

# Force renewal
certbot renew --force-renewal

# Reload Apache
systemctl reload apache2
```

---

## 🔧 Advanced Configuration

### Add Additional Domains

```bash
ssh root@38.242.250.92

# Add new domain to certificate
certbot --apache -d arafa.contaboo.com -d www.arafa.contaboo.com -d api.arafa.contaboo.com

# Reload Apache
systemctl reload apache2
```

### Change Certificate Settings

**Enable Stronger SSL Settings:**

Edit Apache SSL config:
```bash
nano /etc/apache2/sites-enabled/000-default-le-ssl.conf
```

Add:
```apache
# Use strong SSL protocols only
SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1

# Use strong ciphers
SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384

# Enable OCSP Stapling
SSLUseStapling on
SSLStaplingCache "shmcb:logs/ssl_stapling(32768)"
```

Reload Apache:
```bash
systemctl reload apache2
```

### Backup Certificates

```bash
ssh root@38.242.250.92

# Backup entire Let's Encrypt directory
tar -czf letsencrypt_backup_$(date +%Y%m%d).tar.gz /etc/letsencrypt/

# Copy to local machine
scp root@38.242.250.92:~/letsencrypt_backup_*.tar.gz ~/backups/
```

---

## 📊 Monitoring SSL Status

### Setup Monitoring Alerts

**Use SSL monitoring services:**
- https://uptimerobot.com/ (Free plan available)
- https://www.sslshopper.com/ssl-checker.html
- https://www.ssllabs.com/ssltest/

**Setup Email Alerts:**

Certbot sends emails to `admin@contaboo.com` for:
- Renewal success/failure
- Certificate expiration warnings (7 days before)

**Check Alert Email:**
```bash
ssh root@38.242.250.92
tail -f /var/log/mail.log
```

---

## 📝 SSL Checklist

After deployment, verify:

- [ ] https://arafa.contaboo.com loads correctly
- [ ] http://arafa.contaboo.com redirects to HTTPS
- [ ] Browser shows padlock icon (secure connection)
- [ ] Certificate is valid (not expired)
- [ ] Certificate issued by "Let's Encrypt"
- [ ] Auto-renewal timer is active
- [ ] Dry run renewal test passes
- [ ] SSL Labs rating is A or A+
- [ ] All site resources load over HTTPS (no mixed content)

---

## 🆘 Quick Help Commands

```bash
# Check certificate
./scripts/5_manage_ssl.sh  # Choose option 1

# Test renewal
./scripts/5_manage_ssl.sh  # Choose option 3

# View detailed status
ssh root@38.242.250.92 'certbot certificates && systemctl status certbot.timer'

# Check website SSL
curl -I https://arafa.contaboo.com

# Full SSL test
open https://www.ssllabs.com/ssltest/analyze.html?d=arafa.contaboo.com
```

---

## 📚 Additional Resources

- **Certbot Documentation:** https://certbot.eff.org/
- **Let's Encrypt:** https://letsencrypt.org/
- **SSL Best Practices:** https://wiki.mozilla.org/Security/Server_Side_TLS
- **SSL Labs Testing:** https://www.ssllabs.com/ssltest/
- **Apache SSL Guide:** https://httpd.apache.org/docs/2.4/ssl/

---

## ✅ Summary

Your deployment automatically handles SSL/HTTPS setup:

1. **Automatic Installation** - Runs during deployment (Step 11)
2. **Let's Encrypt** - Free, trusted SSL certificates
3. **Auto-Renewal** - Certificates renew automatically
4. **HTTPS Redirect** - All traffic uses secure connection
5. **Management Script** - Easy SSL management with `5_manage_ssl.sh`

**Your site is secure by default! 🔒**

---

**Domain:** arafa.contaboo.com  
**SSL Status:** ✅ Enabled  
**Auto-Renewal:** ✅ Active  
**Last Updated:** October 21, 2025

# CI/CD Setup Complete Guide 🚀

## ✅ What's Been Done:

1. **GitHub Actions Workflow Created**: `.github/workflows/deploy-production.yml`
2. **SSH Key Generated**: For secure GitHub → Server communication
3. **Public Key Added to Server**: SSH authentication configured
4. **Code Pushed to GitHub**: Latest changes are on master branch

---

## 📋 To Complete CI/CD Setup:

### Step 1: Add GitHub Secrets

Go to: **https://github.com/ahmedgfathy/global-website/settings/secrets/actions**

Click **"New repository secret"** and add these **THREE** secrets:

#### Secret 1: `SERVER_HOST`
```
5.180.148.92
```

#### Secret 2: `SERVER_USER`
```
root
```

#### Secret 3: `SSH_PRIVATE_KEY`
Copy the ENTIRE private key below (including the BEGIN and END lines):

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACDJtrHHDDuy0jN/YEUCDDoGWmVbZgtuLJkgpOjqzvnmaQAAAKiI0rKGiNKy
hgAAAAtzc2gtZWQyNTUxOQAAACDJtrHHDDuy0jN/YEUCDDoGWmVbZgtuLJkgpOjqzvnmaQ
AAAEDjqWzdvDsfb5uh+H8K61sK+FsbEswJ7Ng6wCHyCkPV0sm2sccMO7LSM39gRQIMOgZa
ZVtmC24smSCk6OrO+eZpAAAAJWdpdGh1Yi1hY3Rpb25zQGdsb21hcnRyZWFsZXN0YXRlcy
5jb20=
-----END OPENSSH PRIVATE KEY-----
```

---

### Step 2: Test the CI/CD Pipeline

After adding all three secrets, trigger a deployment by pushing any change:

```bash
cd /Users/ahmedgomaa/Downloads/global-website

# Make a small change (update README or any file)
echo "# CI/CD is now active 🚀" >> README.md

# Commit and push
git add README.md
git commit -m "test: Trigger CI/CD deployment"
git push origin master
```

---

### Step 3: Monitor the Deployment

Watch the deployment progress at:
**https://github.com/ahmedgfathy/global-website/actions**

You'll see:
- ✅ Checkout code
- ✅ Setup Node.js and pnpm
- ✅ Install SSH key
- ✅ Deploy to production (SSH to server, git pull, install, build, restart)
- ✅ Verify deployment

---

## 🎯 What Happens When You Push:

1. GitHub Actions detects push to `master` branch
2. Connects to your server via SSH (using the private key)
3. Navigates to `/var/www/global-website`
4. Pulls latest code: `git pull origin master`
5. Installs dependencies: `pnpm install`
6. Builds the app: `pnpm build`
7. Restarts PM2: `pm2 restart global-website`
8. Verifies the app is running
9. ✅ Deployment complete!

---

## 🌐 Your Live Website:

After successful deployment, changes will be live at:
**https://www.glomartrealestates.com**

---

## 📊 What's New on the Website:

### Home Page Sections:
1. **Featured Premium Projects** - Your exclusive luxury projects
2. **Top Residential Properties** - Latest apartments & villas from database
3. **Top Commercial Properties** - Office & commercial spaces (NEW!)
4. **Recommended Properties** - General recommendations

### API Endpoints:
- `/api/properties?action=getLatestResidential` - Residential properties
- `/api/properties?action=getLatestCommercial` - Commercial properties (NEW!)

### Database Integration:
- Real properties from MariaDB (django_db_glomart_rs)
- Images from `/var/www/glomart-crm/public/properties/images/`
- Served via Nginx at `/properties/images/`

---

## 🔧 Manual Deployment (if needed):

If you need to deploy manually without CI/CD:

```bash
ssh root@5.180.148.92

cd /var/www/global-website
git pull origin master
pnpm install
pnpm build
pm2 restart global-website
pm2 logs global-website --lines 50
```

---

## ✅ Current Status:

- ✅ Code pushed to GitHub
- ✅ SSH key configured
- ⏳ GitHub Secrets pending (need to add via web UI)
- ⏳ CI/CD pipeline ready (will work once secrets are added)

---

## 🆘 Troubleshooting:

### If deployment fails:
1. Check Actions tab: https://github.com/ahmedgfathy/global-website/actions
2. Review the error logs
3. Verify all three secrets are correctly added
4. Ensure SSH key was copied correctly (no extra spaces/newlines)

### If website doesn't update:
```bash
ssh root@5.180.148.92
pm2 logs global-website --lines 100
```

### Check PM2 status:
```bash
ssh root@5.180.148.92
pm2 status
pm2 info global-website
```

---

## 📝 Next Steps After Setup:

1. ✅ Add GitHub Secrets (see Step 1 above)
2. ✅ Push a test commit (see Step 2 above)
3. ✅ Watch deployment at Actions tab
4. ✅ Verify website updates at www.glomartrealestates.com

---

**Need help?** Check the workflow file at `.github/workflows/deploy-production.yml`

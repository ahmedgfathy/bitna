# CI/CD Setup Guide

This project uses **GitHub Actions** for automatic deployment to the production server.

## 🚀 How It Works

Every time you push code to the `master` branch:

1. **GitHub Actions** triggers automatically
2. Code is pulled on the production server from GitHub
3. Dependencies are installed with `pnpm`
4. Next.js application is built
5. PM2 restarts the application
6. Deployment verification runs

## ⚙️ Required GitHub Secrets

You need to configure these secrets in your GitHub repository:

### Setting Up Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each of the following:

#### Required Secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `SERVER_HOST` | `5.180.148.92` | Production server IP address |
| `SERVER_USER` | `root` | SSH user for deployment |
| `SSH_PRIVATE_KEY` | Your SSH private key | Private key for SSH authentication |

### 🔑 Getting Your SSH Private Key

You have two options:

#### Option 1: Use Existing SSH Key (Recommended)
If you already connect to the server via SSH:

```bash
# On your Mac, display your private key
cat ~/.ssh/id_rsa

# Or if you use a different key:
cat ~/.ssh/id_ed25519
```

Copy the **entire output** including:
- `-----BEGIN OPENSSH PRIVATE KEY-----`
- All the key content
- `-----END OPENSSH PRIVATE KEY-----`

#### Option 2: Create New Deployment Key
Create a dedicated key for GitHub Actions:

```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "github-actions@glomartrealestates.com" -f ~/.ssh/deploy_key

# Copy private key (use this for GitHub Secret)
cat ~/.ssh/deploy_key

# Copy public key to server
ssh-copy-id -i ~/.ssh/deploy_key.pub root@5.180.148.92
```

### 📝 Step-by-Step Secret Configuration

1. **SERVER_HOST**:
   - Name: `SERVER_HOST`
   - Value: `5.180.148.92`

2. **SERVER_USER**:
   - Name: `SERVER_USER`
   - Value: `root`

3. **SSH_PRIVATE_KEY**:
   - Name: `SSH_PRIVATE_KEY`
   - Value: Paste your entire SSH private key (from Option 1 or 2 above)

## 🎯 Workflow Triggers

The deployment workflow runs:

- ✅ **Automatically** when you push to `master` branch
- ✅ **Manually** from GitHub Actions tab (using workflow_dispatch)

### Manual Deployment

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Deploy to Production** workflow
4. Click **Run workflow** → **Run workflow**

## 📊 Monitoring Deployments

### View Deployment Status

1. Go to **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. View logs for each step

### Check Production

After deployment completes:
- **Website**: https://www.glomartrealestates.com
- **API Test**: `curl https://www.glomartrealestates.com/api/properties?action=getAll&limit=1`

## 🔧 Workflow Steps

The deployment workflow performs these steps:

1. **Checkout code**: Pulls latest code from GitHub
2. **Setup Node.js**: Installs Node.js 18
3. **Setup pnpm**: Installs pnpm package manager
4. **Install SSH Key**: Configures SSH access to server
5. **Deploy**: Connects to server and runs deployment script
   - Pulls latest code
   - Installs dependencies
   - Builds Next.js app
   - Restarts PM2
6. **Verify**: Tests the deployment
7. **Summary**: Shows deployment status

## 🚨 Troubleshooting

### Deployment Fails - SSH Connection

**Error**: `Permission denied (publickey)`

**Fix**: Ensure SSH_PRIVATE_KEY secret is set correctly
```bash
# Test SSH connection locally first
ssh root@5.180.148.92 'echo "Connection successful"'
```

### Deployment Fails - Build Error

**Error**: Build fails during `pnpm run build`

**Fix**: Test build locally first
```bash
pnpm install
pnpm run build
```

### PM2 Restart Fails

**Error**: PM2 process not found

**Fix**: Check if PM2 is running on server
```bash
ssh root@5.180.148.92 'pm2 status'
```

## 🔄 Deployment Flow Diagram

```
Your Computer                GitHub                Production Server
     |                          |                          |
     |---> git push master ---->|                          |
     |                          |                          |
     |                          |---> Triggers Action      |
     |                          |                          |
     |                          |---> SSH Connect -------->|
     |                          |                          |
     |                          |                    git pull
     |                          |                    pnpm install
     |                          |                    pnpm build
     |                          |                    pm2 restart
     |                          |                          |
     |                          |<---- Success/Failure ----|
     |                          |                          |
     |<--- Notification --------|                          |
```

## 📋 Deployment Checklist

Before first deployment, ensure:

- [ ] GitHub Secrets configured (SERVER_HOST, SERVER_USER, SSH_PRIVATE_KEY)
- [ ] SSH key added to server's authorized_keys
- [ ] PM2 process named 'global-website' exists
- [ ] Git repository initialized on server at `/var/www/global-website`
- [ ] Server has internet access to pull from GitHub

## 🎉 Benefits of This Setup

✅ **Automatic Deployment**: Push to master, automatic deployment
✅ **Consistent**: Same deployment process every time
✅ **Fast**: Deploys in 2-3 minutes
✅ **Safe**: Verification step ensures deployment works
✅ **Transparent**: Full logs available in GitHub Actions
✅ **Rollback Ready**: Can manually deploy previous commits

## 🔐 Security Notes

- SSH private key is encrypted in GitHub Secrets
- Only users with write access can trigger deployments
- Server access is restricted to GitHub Actions via SSH key
- All deployment logs are available in GitHub (no sensitive data logged)

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs
2. SSH into server and check PM2 logs: `pm2 logs global-website`
3. Check Nginx logs: `tail -50 /var/log/nginx/glomartrealestates-error.log`
4. Test deployment script manually on server

---

**Next Step**: Configure the GitHub Secrets, then push any change to master to test the deployment! 🚀

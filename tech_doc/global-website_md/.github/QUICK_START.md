# Quick Start: CI/CD Setup

## ⚡ 3-Step Setup

### Step 1: Copy Your SSH Key
The private key has been displayed above. Copy everything from:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

### Step 2: Add GitHub Secrets
Go to: https://github.com/ahmedgfathy/global-website/settings/secrets/actions

Click "New repository secret" for each:

| Secret Name | Value |
|------------|-------|
| `SERVER_HOST` | `5.180.148.92` |
| `SERVER_USER` | `root` |
| `SSH_PRIVATE_KEY` | *paste the SSH key you copied* |

### Step 3: Push to Master
```bash
git push origin master
```

That's it! GitHub Actions will automatically deploy to production! 🚀

## 📺 See It In Action

After pushing, go to:
https://github.com/ahmedgfathy/global-website/actions

You'll see the deployment running in real-time!

## ✅ What Happens Automatically

Every time you push to `master`:
1. ✅ Code pulled from GitHub
2. ✅ Dependencies installed
3. ✅ Next.js app built
4. ✅ PM2 restarted
5. ✅ Deployment verified
6. ✅ Live at www.glomartrealestates.com

**Deployment time: ~2-3 minutes**

---

Need help? Check `.github/CICD_SETUP.md` for full documentation.

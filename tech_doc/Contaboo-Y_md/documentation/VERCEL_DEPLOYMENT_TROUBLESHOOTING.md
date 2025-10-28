# Vercel Deployment Troubleshooting Guide

## Issue: "1 failing check" on GitHub

This typically occurs when Vercel deployment fails. Here are the most common causes and solutions:

## Common Causes & Solutions

### 1. **Environment Variables Missing**
Vercel needs the same environment variables as your local development.

**Solution:**
1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add these required variables:
   ```bash
   DATABASE_URL=your-production-database-url
   NEXTAUTH_URL=https://your-vercel-app.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   GOOGLE_CLIENT_ID=your-google-client-id (if using Google OAuth)
   GOOGLE_CLIENT_SECRET=your-google-client-secret (if using Google OAuth)
   ```

### 2. **Database Connection Issues**
Vercel can't connect to your local PostgreSQL database.

**Solution:**
- Use a cloud database service like:
  - **Vercel Postgres** (recommended)
  - **Supabase** (free tier available)
  - **PlanetScale** (MySQL alternative)
  - **Railway** or **Render** PostgreSQL

### 3. **Build Command Issues**
PWA files might cause build issues if not properly configured.

**Solution - Update package.json:**
```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap --config next-sitemap.config.js",
    "start": "next start"
  }
}
```

### 4. **Next.js Metadata Warnings**
The build warnings about metadata might cause issues.

**Solution - Fix layout.tsx:**
```typescript
// Instead of putting everything in metadata, split viewport
export const metadata: Metadata = {
  title: "ProLeads - Lead Management CRM",
  description: "Professional lead generation and management system for real estate professionals",
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```

## Quick Fix Steps

### Step 1: Check Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your project
3. Click on "Functions" or "Deployments"
4. Look for error messages in the latest deployment

### Step 2: Add Environment Variables
1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from your `.env` file
3. Make sure `NEXTAUTH_URL` matches your Vercel domain

### Step 3: Redeploy
1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger deployment

## Database Setup for Production

### Option A: Vercel Postgres (Recommended)
```bash
# In your Vercel dashboard
1. Go to Storage → Create Database → Postgres
2. Copy the DATABASE_URL
3. Add to Environment Variables
4. Run: npx prisma generate
5. Run: npx prisma db push
```

### Option B: Supabase (Free)
```bash
1. Go to supabase.com → Create project
2. Copy database URL from Settings → Database
3. Add to Vercel Environment Variables
4. Update DATABASE_URL in Vercel
```

## Environment Variables Template

Copy this to your Vercel Environment Variables:

```bash
# Required
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=a-very-long-random-string-here

# Optional (for Google OAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# PWA (auto-detected)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Debugging Commands

### Check deployment logs:
```bash
# Install Vercel CLI
npm i -g vercel

# Login and check logs
vercel login
vercel logs your-app-name
```

### Test build locally:
```bash
npm run build
npm start
```

## Common Error Messages & Solutions

### "Module not found"
- **Cause**: Missing dependencies
- **Solution**: `npm install` and check imports

### "Database connection failed"
- **Cause**: Wrong DATABASE_URL
- **Solution**: Update environment variable in Vercel

### "NextAuth configuration error"
- **Cause**: Missing NEXTAUTH_SECRET or wrong NEXTAUTH_URL
- **Solution**: Add proper environment variables

### "Build timeout"
- **Cause**: Large build or infinite loops
- **Solution**: Optimize imports and check for circular dependencies

## Final Checklist

- [ ] All environment variables added to Vercel
- [ ] DATABASE_URL points to production database
- [ ] NEXTAUTH_URL matches Vercel domain
- [ ] Build completes successfully locally
- [ ] No TypeScript errors
- [ ] PWA files are accessible
- [ ] Service worker syntax is correct

## If Still Failing

1. **Check Vercel Function Logs**: Dashboard → Functions → View logs
2. **Check GitHub Actions**: If using GitHub Actions, check the Actions tab
3. **Contact Support**: Vercel support with deployment logs
4. **Try Manual Deploy**: Use Vercel CLI to deploy manually

The most common issue is missing environment variables, especially `DATABASE_URL` for production database connection.

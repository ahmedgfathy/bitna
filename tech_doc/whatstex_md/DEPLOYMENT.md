# 🚀 Vercel + Supabase Deployment Guide

## Step 1: Deploy to Vercel

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Vercel and Supabase configuration"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository: `ahmedgfathy/whatstex`
   - Click "Deploy"

## Step 2: Configure Environment Variables in Vercel

In your Vercel dashboard, go to **Settings > Environment Variables** and add:

### 🔑 Required Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://cesirgnbnkcytdlasixh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlc2lyZ25ibmtjeXRkbGFzaXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NDQ0NzEsImV4cCI6MjA3MjEyMDQ3MX0.W-erQAxMkp2htWi5EbCcYBjySEbEOnqd1ezJmNm9OZY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlc2lyZ25ibmtjeXRkbGFzaXhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU0NDQ3MSwiZXhwIjoyMDcyMTIwNDcxfQ.uMIaf1bmR6L0PoTFRr3kaIO4a6xmY7-eRvsnKj86Ou8
```

**Important**: Set all variables for **Production**, **Preview**, and **Development** environments.

## Step 3: Test Deployment

1. **After deployment**, visit your Vercel URL
2. **First, test the debug page**: `https://your-app.vercel.app/debug.html`
3. **Then test login**: `https://your-app.vercel.app/`

## Step 4: Setup Supabase RLS (Run Once)

After successful deployment, visit:
```
https://your-app.vercel.app/api/setup-rls
```

This will configure Row Level Security policies.

## Step 5: Create Admin User (Run Once)

POST request to:
```
https://your-app.vercel.app/api/create-admin
```

With body:
```json
{
  "email": "your-email@example.com",
  "password": "your-secure-password"
}
```

## 🔍 Troubleshooting

### If you see domain errors:
1. Check Vercel dashboard for deployment logs
2. Verify environment variables are set correctly
3. Visit `/debug.html` to check connectivity

### If Supabase connection fails:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Check your project is active
3. Verify API keys in Settings > API

### If RLS issues occur:
1. In Supabase Dashboard, go to Authentication > Policies
2. Ensure policies exist for your tables
3. Re-run `/api/setup-rls` if needed

## 📱 PWA Testing

After successful deployment:
1. Open site on mobile Chrome/Safari
2. Look for "Install App" prompt
3. Test offline functionality

## 🎯 Quick Deployment Commands

```bash
# If you need to redeploy
vercel --prod

# If you need to check logs
vercel logs your-deployment-url
```

Your app should now be live and working! 🚀

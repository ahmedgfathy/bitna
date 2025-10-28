# Deployment Guide - Contaboo Real Estate CRM

This guide covers deployment options and configurations for the Contaboo Real Estate CRM system.

## 🚀 Deployment Options

### 1. Vercel (Recommended)

Vercel provides the best integration with Next.js applications.

#### Quick Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Manual Setup
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. Set environment variables in Vercel dashboard:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=68bf5a2cd78f0a617a92
NEXT_PUBLIC_APPWRITE_DATABASE_ID=real_estate
```

### 2. Netlify

Alternative hosting option with great CI/CD integration.

#### Setup
1. Connect repository to Netlify
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: `/`

3. Environment variables:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=68bf5a2cd78f0a617a92
NEXT_PUBLIC_APPWRITE_DATABASE_ID=real_estate
```

### 3. Digital Ocean App Platform

Cloud-native deployment with automatic scaling.

#### Setup
1. Create new app from GitHub repository
2. Configure build settings:
   - **Source Directory**: `/`
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`

3. Add environment variables in App Platform dashboard

### 4. Docker Deployment

For containerized deployments and self-hosting.

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  contaboo-crm:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
      - NEXT_PUBLIC_APPWRITE_PROJECT_ID=68bf5a2cd78f0a617a92
      - NEXT_PUBLIC_APPWRITE_DATABASE_ID=real_estate
    restart: unless-stopped
```

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Purchase/Configure Domain**
   - Point A record to deployment platform IP
   - Configure CNAME for subdomains

2. **SSL Certificate**
   - Most platforms provide automatic SSL
   - For custom setups, use Let's Encrypt

3. **DNS Configuration**
```
Type    Name        Value
A       @           IP_ADDRESS
CNAME   www         yourdomain.com
CNAME   crm         yourdomain.com
```

### Subdomain Structure
- `yourdomain.com` - Main real estate website
- `crm.yourdomain.com` - CRM dashboard (optional)
- `api.yourdomain.com` - API endpoints (future)

## ⚙️ Environment Configuration

### Production Environment Variables
```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=68bf5a2cd78f0a617a92
NEXT_PUBLIC_APPWRITE_DATABASE_ID=real_estate

# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXX

# Optional: Error Monitoring
SENTRY_DSN=https://xxxxxxxxxx@sentry.io/xxxxxxxxxx

# Optional: Email Service
EMAIL_SERVICE_API_KEY=your_email_service_key
```

### Development Environment
```env
# Development overrides
NODE_ENV=development
NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost/v1  # Local Appwrite
```

## 🔧 Build Optimization

### Next.js Configuration

Update `next.config.ts`:
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: [
      'fra.cloud.appwrite.io',
      'cloud.appwrite.io',
      // Add your CDN domains
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to package.json
"analyze": "ANALYZE=true npm run build"

# Run analysis
npm run analyze
```

## 📊 Monitoring & Analytics

### Performance Monitoring

1. **Vercel Analytics** (if using Vercel)
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

2. **Google Analytics**
```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};
```

### Error Monitoring

1. **Sentry Integration**
```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## 🔒 Security Configuration

### Content Security Policy
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: *.appwrite.io;
      font-src 'self';
      connect-src 'self' *.appwrite.io;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

### Rate Limiting
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Implement rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Add rate limiting logic
  }
  
  return NextResponse.next();
}
```

## 📈 Performance Optimization

### Caching Strategy
```typescript
// app/layout.tsx
export const metadata = {
  title: 'Contaboo Real Estate',
  description: 'Premium real estate CRM platform',
  // Cache control
  'Cache-Control': 'public, max-age=31536000, immutable'
};
```

### Image Optimization
```typescript
// next.config.ts
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

## 🧪 Deployment Testing

### Pre-deployment Checklist
- [ ] All environment variables configured
- [ ] Build passes without errors
- [ ] Tests pass (when implemented)
- [ ] Security headers configured
- [ ] SSL certificate active
- [ ] Performance metrics acceptable
- [ ] CRM login functionality working
- [ ] Property search functioning
- [ ] Mobile responsiveness verified

### Testing Commands
```bash
# Build test
npm run build

# Type checking
npm run type-check

# Lint check
npm run lint

# Start production build locally
npm start
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run type-check`
   - Verify all dependencies: `npm install`
   - Clear cache: `rm -rf .next && npm run build`

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable naming (NEXT_PUBLIC_ prefix for client-side)
   - Restart deployment after variable changes

3. **Appwrite Connection**
   - Verify endpoint URL
   - Check project ID
   - Ensure network connectivity
   - Validate API keys

4. **Performance Issues**
   - Run bundle analyzer
   - Optimize images
   - Enable compression
   - Check for memory leaks

## 📞 Support

For deployment support:
- **Documentation**: Check this guide and Next.js docs
- **Platform Support**: Contact your hosting provider
- **Appwrite Issues**: Appwrite documentation and support
- **Custom Issues**: Create GitHub issue

---

**Deployment made simple for your real estate CRM! 🚀**

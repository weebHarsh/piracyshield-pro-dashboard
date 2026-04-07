# PiracyShield Pro - Production Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account (https://vercel.com)
- Git repository with your code

### Deployment Steps

#### 1. Connect Repository
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link
```

#### 2. Configure Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add the following:
   - `NEXT_PUBLIC_APP_NAME` = "PiracyShield Pro"
   - `NEXT_PUBLIC_API_URL` = "/api" (for frontend API routes)
   - For production backend: `DATABASE_URL`, `JWT_SECRET`, etc.

#### 3. Deploy
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Manual Configuration

#### Build Settings (auto-detected)
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### Environment Variables
Set in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_APP_NAME` | PiracyShield Pro | All |
| `NEXT_PUBLIC_API_URL` | /api | Production |
| `NODE_ENV` | production | Production |

### Production Checklist

- [ ] All environment variables set
- [ ] Build passing locally (`npm run build`)
- [ ] Tests passing (`npx playwright test`)
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Performance optimized
- [ ] SEO meta tags present
- [ ] Accessibility compliance (WCAG 2.1 AA)

### Post-Deployment

1. Verify deployment URL
2. Test all pages
3. Test authentication flow
4. Test API routes
5. Monitor for errors in Vercel dashboard

### Monitoring

Vercel provides:
- Real-time logs
- Analytics
- Performance metrics
- Error tracking

Access at: `https://vercel.com/your-username/piracyshield-pro`

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS (automatic)

### Troubleshooting

**Build fails:**
- Check `npm run build` locally
- Verify TypeScript errors: `npm run type-check`
- Check for missing dependencies

**API routes not working:**
- Verify route handlers in `/api/`
- Check request/response formats
- Review server logs in Vercel dashboard

**Environment variables not loading:**
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding new variables
- Check variable names match exactly

### CI/CD Integration

Vercel automatically deploys on:
- Every push to main/master
- Every pull request (preview deployment)

### Rollback

If deployment fails:
1. Go to Vercel Dashboard → Deployments
2. Find last successful deployment
3. Click "..." → "Promote to Production"

### Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Project Issues: [GitHub Issues URL]
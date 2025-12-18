# GitHub to AWS Amplify Deployment Guide

## 🔄 Current Deployment Architecture

**Repository**: `https://github.com/PeterGeers/jabaki-rentals.git`
**Branch**: `main`
**Frontend Path**: `frontend/`
**Backend**: AWS Lambda (separate deployment)

## 📋 Pre-Deployment Checklist

Before pushing to GitHub, ensure all guardrails are met:

### 1. **Local Testing** ✅

```bash
cd frontend
npm run test:run
```

**Expected**: All 68 tests pass, including SEO property-based tests

### 2. **Build Validation** ✅

```bash
npm run build
```

**Expected**:

- ✅ All studio routes successfully prerendered
- ✅ Sitemap generated with 3 URLs
- ✅ Static HTML files created for SEO

### 3. **Backend API Test** ✅

```bash
cd ..
.\test-backend.ps1
```

**Expected**: Backend API responding correctly

## 🚀 Deployment Process

### Method 1: Using Existing Script (Recommended)

```bash
# From project root
.\gitUpdate.ps1 "SEO metadata update for studios"
```

This script automatically:

1. Adds all changes to git
2. Commits with timestamp
3. Pushes to `origin main`

### Method 2: Manual Git Commands

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update SEO metadata for Garden Studio - 2025-12-18"

# Push to trigger Amplify build
git push origin main
```

## 🏗️ AWS Amplify Build Process

### Automatic Triggers

Amplify automatically builds when:

- ✅ Code is pushed to `main` branch
- ✅ Pull requests are merged
- ✅ Manual build is triggered in Amplify console

### Build Configuration

Amplify should be configured with these settings:

#### **Build Settings**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd frontend
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: frontend/dist
    files:
      - "**/*"
  cache:
    paths:
      - frontend/node_modules/**/*
```

#### **Environment Variables**

- `NODE_VERSION`: `18` (or latest LTS)
- `NPM_CONFIG_UNSAFE_PERM`: `true`

### Build Phases Explained

1. **Pre-Build**:

   - Changes to `frontend/` directory
   - Installs dependencies with `npm ci`

2. **Build**:

   - Runs `npm run build`
   - Executes TypeScript compilation
   - Generates static HTML files for SEO
   - Creates sitemap.xml
   - Bundles CSS/JS assets

3. **Deploy**:
   - Uploads `frontend/dist/` contents to Amplify hosting
   - Configures routing for SPA
   - Enables HTTPS and CDN

## 📊 Monitoring Deployment

### 1. **Amplify Console**

- Visit AWS Amplify console
- Check build logs for errors
- Monitor deployment status

### 2. **Build Logs to Watch For**

#### ✅ **Success Indicators**

```
✓ 87 modules transformed
✅ Successfully prerendered: /red-studio
✅ Successfully prerendered: /green-studio
✅ Successfully prerendered: /garden-studio
✓ Sitemap generated: dist/sitemap.xml
✓ built in X.XXs
```

#### ⚠️ **Warnings (Safe to Ignore)**

```
⚠️ Missing SEO elements in /red-studio: { title: true, description: false, canonical: false }
```

_These are informational - SEO still works via MetadataManager_

#### ❌ **Errors (Must Fix)**

```
❌ TypeScript compilation errors
❌ Test failures
❌ Build process failures
```

### 3. **Post-Deployment Verification**

#### **Automated Checks**

```bash
# Test live site
curl -I https://jabaki.nl
curl -I https://jabaki.nl/red-studio
curl -I https://jabaki.nl/green-studio
curl -I https://jabaki.nl/garden-studio

# Check sitemap
curl https://jabaki.nl/sitemap.xml
```

#### **Manual Verification**

1. **Visit each studio page**:

   - https://jabaki.nl/red-studio
   - https://jabaki.nl/green-studio
   - https://jabaki.nl/garden-studio

2. **Check SEO elements** (View Page Source):

   ```html
   <title>Red Studio Hoofddorp | Jabaki</title>
   <meta name="description" content="..." />
   <link rel="canonical" href="https://jabaki.nl/red-studio" />
   ```

3. **Verify sitemap**: https://jabaki.nl/sitemap.xml

## 🔧 Amplify Configuration Setup

If Amplify is not yet configured, here's the setup process:

### 1. **Connect Repository**

- In AWS Amplify console
- Choose "Host web app"
- Connect to GitHub repository: `PeterGeers/jabaki-rentals`
- Select `main` branch

### 2. **Configure Build Settings**

- **App root directory**: Leave empty (monorepo)
- **Build command**: `cd frontend && npm run build`
- **Output directory**: `frontend/dist`

### 3. **Environment Variables**

```
NODE_VERSION = 18
NPM_CONFIG_UNSAFE_PERM = true
```

### 4. **Custom Domain** (if applicable)

- Add custom domain: `jabaki.nl`
- Configure DNS settings
- Enable HTTPS redirect

## 🚨 Troubleshooting Deployment Issues

### Issue: Build Fails with TypeScript Errors

**Solution**:

1. Run `npm run build` locally first
2. Fix any TypeScript compilation errors
3. Commit and push fixes

### Issue: Tests Fail in Amplify Build

**Solution**:

1. Ensure all tests pass locally: `npm run test:run`
2. Check for environment-specific test failures
3. Consider adding test skip for CI environment if needed

### Issue: SEO Files Not Generated

**Symptoms**: Missing static HTML files or sitemap

**Solution**:

1. Verify build output shows prerendering success
2. Check Amplify build logs for prerendering errors
3. Ensure `frontend/dist/` contains studio HTML files

### Issue: Deployment Succeeds but Site Not Updated

**Solution**:

1. Clear browser cache (Ctrl+F5)
2. Check Amplify console for actual deployment completion
3. Verify CDN cache invalidation

## 📈 Performance Monitoring

### Key Metrics to Monitor

- **Build Time**: Should be under 5 minutes
- **Bundle Size**: Monitor for significant increases
- **SEO Score**: Use Google PageSpeed Insights
- **Core Web Vitals**: Monitor loading performance

### Optimization Tips

- **Cache Dependencies**: Amplify caches `node_modules`
- **Parallel Builds**: Avoid concurrent deployments
- **Asset Optimization**: Vite handles automatically

## 🔄 Rollback Procedures

### Quick Rollback via Amplify Console

1. Go to AWS Amplify console
2. Find previous successful deployment
3. Click "Redeploy this version"

### Rollback via Git

```bash
# Find last working commit
git log --oneline

# Revert to specific commit
git revert <commit-hash>

# Push to trigger new deployment
git push origin main
```

## 📋 SEO Metadata Update Workflow

### Complete Process for Metadata Changes

1. **Update Configuration**

   ```bash
   # Edit metadata
   code frontend/src/config/seo.config.ts
   ```

2. **Local Validation**

   ```bash
   cd frontend
   npm run test:run    # All tests must pass
   npm run build       # Build must succeed
   ```

3. **Commit and Deploy**

   ```bash
   cd ..
   .\gitUpdate.ps1 "Update SEO metadata for [studio] - [description]"
   ```

4. **Monitor Deployment**

   - Watch Amplify console for build completion
   - Verify prerendering success in logs
   - Check sitemap generation

5. **Verify Live Site**
   - Test all studio pages
   - Verify metadata in page source
   - Check sitemap.xml

## 🔗 Related Resources

- **Amplify Console**: AWS Console > Amplify
- **Repository**: https://github.com/PeterGeers/jabaki-rentals
- **Live Site**: https://jabaki.nl
- **Backend API**: Separate Lambda deployment
- **Monitoring**: CloudWatch logs for detailed debugging

## 📞 Emergency Contacts

- **Domain Management**: Squarespace DNS
- **Hosting**: AWS Amplify Console
- **Backend**: AWS Lambda Console
- **Monitoring**: AWS CloudWatch

---

**Remember**: Always test locally before deploying. The automated deployment process is robust, but prevention is better than rollback.

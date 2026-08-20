# Deployment Checklist

## 🚀 Quick Deployment Process

### Pre-Deployment (Required)

- [ ] **Tests Pass**: `cd frontend && npm run test:run`
- [ ] **Build Success**: `npm run build`
- [ ] **Backend Working**: `.\test-backend.ps1`

### Deploy to Production

- [ ] **Commit Changes**: `.\gitUpdate.ps1 "Your message here"`
- [ ] **Monitor Build**: Check Amplify console
- [ ] **Verify Live Site**: Test all studio pages

## 📋 SEO Metadata Update Checklist

### Before Editing

- [ ] Backup current `frontend/src/config/seo.config.ts`
- [ ] Note current test status: All 68 tests passing

### After Editing

- [ ] **Required Keywords Present**:
  - [ ] Red Studio: "rooftop" in features
  - [ ] Green Studio: "terrace" OR "modern" in features
  - [ ] Garden Studio: "garden" OR "terras" in features
- [ ] **Garden Studio Special Requirements**:
  - [ ] "Privé Terras" in title
  - [ ] Priority = 0.9 (highest)
  - [ ] Dutch keywords: "tuin", "privé terras"

### Testing

- [ ] **All Tests Pass**: `npm run test:run` (68/68)
- [ ] **Build Succeeds**: `npm run build`
- [ ] **Prerendering Works**: All 3 studios in build output
- [ ] **Sitemap Generated**: 3 URLs included

### Deployment

- [ ] **Git Push**: `.\gitUpdate.ps1 "SEO update: [description]"`
- [ ] **Amplify Build**: Monitor console for success
- [ ] **Live Verification**: Check metadata in page source

## ⚠️ Red Flags - Stop Deployment

### Test Failures

- ❌ Any test failures in `npm run test:run`
- ❌ TypeScript compilation errors
- ❌ Build process failures

### Build Issues

- ❌ Prerendering fails for any studio
- ❌ Sitemap not generated
- ❌ Missing static HTML files

### Configuration Errors

- ❌ Garden Studio priority not 0.9
- ❌ Missing required keywords
- ❌ Malformed titles or descriptions

## 🔧 Quick Fixes

### Tests Failing?

```bash
# Check specific test
npm test -- --run src/components/seo/ContentConsistency.test.tsx

# Common fix: Update test expectations to match new features
```

### Build Warnings?

```
⚠️ Missing SEO elements in /red-studio
```

**Action**: Safe to ignore (informational only)

### Amplify Build Failing?

1. Check build logs in Amplify console
2. Verify local build works: `npm run build`
3. Check for environment differences

## 📞 Emergency Rollback

### Via Amplify Console

1. AWS Amplify > App > Deployments
2. Find last working version
3. Click "Redeploy this version"

### Via Git

```bash
git log --oneline              # Find last working commit
git revert <commit-hash>       # Revert changes
.\gitUpdate.ps1 "Emergency rollback"
```

## 🎯 Success Indicators

### Local Build Success

```
✓ 87 modules transformed
✅ Successfully prerendered: /red-studio
✅ Successfully prerendered: /green-studio
✅ Successfully prerendered: /garden-studio
✓ Sitemap generated: dist/sitemap.xml
✓ built in X.XXs
```

### Amplify Deployment Success

- ✅ Build completes without errors
- ✅ All studio routes accessible
- ✅ Metadata visible in page source
- ✅ Sitemap.xml contains 3 URLs

### Live Site Verification

- ✅ https://jabaki.nl/red-studio loads
- ✅ https://jabaki.nl/green-studio loads
- ✅ https://jabaki.nl/garden-studio loads
- ✅ Page titles show updated metadata
- ✅ Meta descriptions updated
- ✅ Sitemap reflects changes

## 📊 Monitoring Commands

```bash
# Test live endpoints
curl -I https://jabaki.nl/red-studio
curl -I https://jabaki.nl/green-studio
curl -I https://jabaki.nl/garden-studio

# Check sitemap
curl https://jabaki.nl/sitemap.xml

# Verify backend
.\test-backend.ps1
```

## 🔗 Quick Links

- **Repository**: https://github.com/PeterGeers/jabaki-rentals
- **Amplify Console**: AWS Console > Amplify
- **Live Site**: https://jabaki.nl
- **Config File**: `frontend/src/config/seo.config.ts`

---

**Golden Rule**: If in doubt, don't deploy. Test locally first!

# SEO Metadata Quick Reference

## 🚀 Quick Update Process

1. **Edit**: `frontend/src/config/seo.config.ts`
2. **Test**: `npm run test:run`
3. **Build**: `npm run build`
4. **Deploy**: Follow `GUARDRAILS.md`

## 📝 Current Metadata (as of December 2025)

### Red Studio

```typescript
title: "Red Studio Hoofddorp | Jabaki";
description: "Stylish Red Studio in Hoofddorp with rooftop terrace. Modern accommodation near Schiphol Airport. Perfect for business travelers and tourists visiting Amsterdam.";
keywords: [
  "red studio",
  "hoofddorp",
  "schiphol",
  "accommodation",
  "rooftop terrace",
  "modern",
  "business travel",
];
priority: 0.8;
```

### Green Studio

```typescript
title: "Green Studio Hoofddorp | Jabaki";
description: "Modern Green Studio in Hoofddorp with terrace. Comfortable accommodation near Schiphol Airport and Amsterdam. Ideal for short and long stays.";
keywords: [
  "green studio",
  "hoofddorp",
  "schiphol",
  "accommodation",
  "terrace",
  "modern",
  "comfortable",
];
priority: 0.8;
```

### Garden Studio

```typescript
title: "Garden Studio Hoofddorp | Privé Terras nabij Schiphol - Jabaki";
description: "Cozy Garden Studio with beautiful private garden terrace near Schiphol Airport. Tranquil outdoor space perfect for relaxation. Garden, tuin, outdoor, privacy, terrace.";
keywords: [
  "garden studio",
  "hoofddorp",
  "schiphol",
  "privé terras",
  "garden",
  "tuin",
  "outdoor",
  "tranquil",
  "privacy",
  "terrace",
];
priority: 0.9;
```

## ⚠️ Critical Requirements

### Garden Studio MUST Include:

- "Privé Terras" in title
- Dutch keywords: "tuin", "privé terras"
- Highest priority: 0.9
- Outdoor-related features

### Test Requirements:

- Red Studio: Must include "rooftop" in features
- Green Studio: Must include "terrace" OR "modern" in features
- Garden Studio: Must include "garden" OR "terras" in features

## 🧪 Test Commands

```bash
# Full test suite
npm run test:run

# SEO-specific tests
npm test -- --run src/config/seo.config.test.ts
npm test -- --run src/components/seo/ContentConsistency.test.tsx
npm test -- --run src/components/seo/MetadataManager.test.ts

# Build validation
npm run build
```

## 📊 Files Automatically Updated

When you change metadata in `seo.config.ts`:

✅ **Page titles** (browser tabs)
✅ **Meta descriptions** (search results)  
✅ **Canonical URLs** (SEO)
✅ **Sitemap.xml** (search engines)
✅ **Static HTML files** (prerendered)
✅ **Property-based tests** (validation)

## 🔧 Common Edits

### Update Description

```typescript
description: "Your new description here (150-160 chars recommended)";
```

### Add Keywords

```typescript
keywords: [...existingKeywords, "new keyword", "another keyword"];
```

### Update Features

```typescript
features: ["New feature 1", "Updated feature 2", "Keep existing feature"];
```

### Change Priority

```typescript
seo: {
  priority: 0.8,  // 0.1 (low) to 1.0 (high)
  changefreq: "weekly"
}
```

## 🚨 Emergency Rollback

If deployment fails:

1. **Revert changes** in `seo.config.ts`
2. **Run tests**: `npm run test:run`
3. **Rebuild**: `npm run build`
4. **Redeploy**: Follow standard process

## 📞 Quick Help

**Tests failing?** Check if you removed required keywords
**Build warnings?** Usually safe to ignore (informational)
**Sitemap not updating?** Ensure `npm run build` completed
**Live site not updated?** Clear browser cache, check deployment

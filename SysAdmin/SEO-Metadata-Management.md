# SEO Metadata Management Guide

## Overview

This document provides comprehensive instructions for updating SEO metadata for the JaBaKi studio pages. The SEO system is centrally managed through configuration files and automatically propagates changes across the entire application.

## 📍 Location of Metadata Configuration

**Primary Configuration File**: `frontend/src/config/seo.config.ts`

This single file controls all SEO metadata for the three studio pages:

- Red Studio
- Green Studio
- Garden Studio

## 🔧 How to Update Metadata

### Step 1: Edit the Configuration File

Open `frontend/src/config/seo.config.ts` and locate the `STUDIO_CONFIGS` array. Each studio has the following structure:

```typescript
{
  id: "red" | "green" | "garden",
  name: string,
  route: string,
  metadata: {
    title: string,           // Page title (appears in browser tab)
    description: string,     // Meta description (appears in search results)
    keywords: string[],      // SEO keywords array
    features: string[]       // Studio feature list
  },
  seo: {
    priority: number,        // Sitemap priority (0.1-1.0)
    changefreq: string       // How often content changes
  }
}
```

### Step 2: Update Specific Fields

#### **Page Titles**

Format: `"Studio Name Location | Jabaki"`

```typescript
title: "Red Studio Hoofddorp | Jabaki";
```

#### **Meta Descriptions**

Include location, key features, and target keywords (150-160 characters recommended):

```typescript
description: "Stylish Red Studio in Hoofddorp with rooftop terrace. Modern accommodation near Schiphol Airport. Perfect for business travelers and tourists visiting Amsterdam.";
```

#### **Keywords Array**

Include relevant search terms:

```typescript
keywords: [
  "red studio",
  "hoofddorp",
  "schiphol",
  "accommodation",
  "rooftop terrace",
  "modern",
  "business travel",
];
```

#### **Features List**

Highlight unique selling points:

```typescript
features: [
  "Private rooftop terrace",
  "Modern furnishing and amenities",
  "Close to Schiphol Airport",
  "Easy access to Amsterdam",
  "Perfect for business travel",
];
```

#### **SEO Settings**

```typescript
seo: {
  priority: 0.8,        // Garden Studio should be 0.9 (highest)
  changefreq: "weekly"  // How often search engines should re-crawl
}
```

### Step 3: Special Considerations

#### **Garden Studio Requirements**

The Garden Studio MUST include Dutch terms for SEO targeting:

- Include "Privé Terras" in the title
- Include "tuin", "garden", "outdoor", "terrace" in keywords
- Maintain highest priority (0.9) due to unique outdoor features

#### **Keyword Guidelines**

- **Red Studio**: Focus on "rooftop", "business travel", "modern"
- **Green Studio**: Focus on "terrace", "comfortable", "extended stays"
- **Garden Studio**: Focus on "garden", "tuin", "privé terras", "outdoor", "tranquil"

## 🧪 Testing Impact on System

### Automated Tests Affected

When you update metadata, the following tests will validate your changes:

#### **1. Content Consistency Tests**

**File**: `frontend/src/components/seo/ContentConsistency.test.tsx`

**What it tests**:

- Metadata uniqueness across studios
- Required fields are present and non-empty
- Studio-specific features are included

**Potential failures**:

- If you remove required keywords (e.g., "rooftop" from Red Studio)
- If features array becomes empty
- If titles/descriptions become identical

#### **2. Metadata Manager Tests**

**File**: `frontend/src/components/seo/MetadataManager.test.ts`

**What it tests**:

- Correct title formats
- Canonical URL generation
- Garden Studio specific requirements

**Potential failures**:

- If Garden Studio title doesn't include "Privé Terras"
- If canonical URLs are malformed

#### **3. SEO Configuration Tests**

**File**: `frontend/src/config/seo.config.test.ts`

**What it tests**:

- All three studios are configured
- Route paths are correct
- Garden Studio has higher priority
- Required outdoor keywords for Garden Studio

**Potential failures**:

- If Garden Studio priority is not 0.9
- If Garden Studio lacks outdoor keywords
- If route paths are changed incorrectly

### Test Commands

Run these commands after making changes:

```bash
# Run all tests
cd frontend
npm run test:run

# Run specific SEO tests only
npm test -- --run src/config/seo.config.test.ts
npm test -- --run src/components/seo/
```

## 🚀 Deployment Process

### Step 1: Validate Changes

```bash
cd frontend
npm run test:run
```

All tests must pass before proceeding.

### Step 2: Build Application

```bash
npm run build
```

This will:

- Generate new static HTML files with updated metadata
- Update the sitemap.xml with any priority changes
- Validate prerendering works with new content

### Step 3: Verify Build Output

Check the build output for:

- ✅ All studio routes successfully prerendered
- ✅ Sitemap generated with correct URLs
- ⚠️ Note any SEO element warnings (informational only)

### Step 4: Deploy

Follow the standard deployment process in `GUARDRAILS.md`.

## 🔍 Verification After Deployment

### Check Live Metadata

1. Visit each studio page: `/red-studio`, `/green-studio`, `/garden-studio`
2. View page source (Ctrl+U) and verify:
   - `<title>` tags contain your updated titles
   - `<meta name="description">` contains your descriptions
   - `<link rel="canonical">` points to correct URLs

### Check Sitemap

Visit `https://jabaki.nl/sitemap.xml` and verify:

- All three studio URLs are present
- Priority values are correct (Garden Studio = 0.9, others = 0.8)
- Last modified dates are current

## ⚠️ Common Issues and Solutions

### Issue: Tests Fail After Metadata Update

**Symptom**: Content consistency tests fail with "expected true to be false"

**Solution**:

1. Check if you removed required keywords:

   - Red Studio must include "rooftop"
   - Green Studio must include "terrace" or "modern"
   - Garden Studio must include "garden" or "terras"

2. Update test expectations if you intentionally changed features:
   - Edit `frontend/src/components/seo/ContentConsistency.test.tsx`
   - Update the feature validation logic to match your new features

### Issue: Build Warnings About Missing SEO Elements

**Symptom**: Build shows warnings like "Missing SEO elements in /red-studio"

**Solution**: This is informational only. The MetadataManager component provides metadata dynamically. The warnings indicate the prerendered HTML doesn't contain all elements, but SEO still works correctly.

### Issue: Sitemap Not Updated

**Symptom**: Sitemap.xml doesn't reflect priority changes

**Solution**:

1. Ensure you ran `npm run build` after changes
2. Check that the build output shows "Sitemap generated"
3. Clear browser cache when checking the live sitemap

## 📋 Metadata Update Checklist

Before deploying metadata changes:

- [ ] Updated titles follow format: "Studio Name Location | Jabaki"
- [ ] Descriptions are 150-160 characters and include key features
- [ ] Keywords include location and studio-specific terms
- [ ] Garden Studio includes Dutch terms ("Privé Terras", "tuin")
- [ ] Garden Studio maintains highest priority (0.9)
- [ ] All tests pass: `npm run test:run`
- [ ] Build succeeds: `npm run build`
- [ ] Prerendering completes for all studios
- [ ] Sitemap generates successfully

## 🔗 Related Files

- **Configuration**: `frontend/src/config/seo.config.ts`
- **Component**: `frontend/src/components/seo/MetadataManager.tsx`
- **Tests**: `frontend/src/components/seo/*.test.*`
- **Build Config**: `frontend/vite.config.ts`
- **Deployment**: `GUARDRAILS.md`

## 📞 Support

If you encounter issues:

1. Check test output for specific error messages
2. Verify your changes follow the format requirements
3. Ensure all required keywords are present for each studio
4. Run individual test files to isolate issues

Remember: The SEO system is designed to be robust. Most changes will work correctly as long as the basic structure is maintained and tests pass.

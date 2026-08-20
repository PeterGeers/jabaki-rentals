---
inclusion: always
---

# JaBaKi — Project Overview

## Domain & Purpose

JaBaKi (jabaki.nl) is a vacation rental website for holiday studios in the Netherlands. It showcases rental listings (Garden Studio, Red Studio, Green Studio), local events, and practical visitor information. Visitors can browse studios, view photo galleries, and submit booking requests.

## Tech Stack

### Frontend
- **React 18** — UI library
- **Vite 7** — build tool and dev server
- **TypeScript 5** — type-safe language
- **Chakra UI 2** — component library (with Emotion for styling)
- **react-router-dom 7** — client-side routing
- **react-i18next / i18next** — internationalization (Dutch + English)
- **react-helmet-async** — per-page SEO metadata
- **Framer Motion** — animations
- **Swiper** — image carousels
- **Formik + Yup** — form handling and validation
- **fast-check** — property-based testing

### Backend
- **Python 3.12** — runtime
- **AWS SAM** — infrastructure-as-code for Lambda
- **AWS Lambda** — serverless API functions
- **API Gateway** — HTTP API routing

### Testing
- **Vitest 4** — unit and integration test runner
- **Testing Library (React)** — component testing
- **fast-check** — property-based testing

### Infrastructure
- **AWS Amplify** — frontend hosting with CI/CD
- **AWS CloudFront** — CDN
- **AWS Route 53** — DNS
- **AWS CloudFormation** — infrastructure stacks (via SAM and Amplify)

## Architecture

```
┌────────────────────────────┐     ┌─────────────────────────────┐
│  Frontend (React SPA)      │     │  Backend (Python Lambda)     │
│  Hosted on AWS Amplify     │────▶│  API Gateway + Lambda        │
│  CDN via CloudFront        │     │  Google Drive image serving  │
└────────────────────────────┘     └─────────────────────────────┘
         │                                    │
         ▼                                    ▼
   Squarespace DNS                   Google Drive API
   (jabaki.nl)                       (photo storage)
```

- The **frontend** is a React SPA with prerendered pages for SEO. Amplify rebuilds and deploys on git push.
- The **backend** is a Python Lambda that handles the Google Drive image API and booking form submissions.
- **Images** are stored in Google Drive and served via a Lambda proxy (`googleImages.ts` utility on the frontend calls the backend API).

## Hosting & Deployment

- **Frontend**: AWS Amplify auto-deploys from the `main` branch. Domain: `jabaki.nl` (DNS managed via Squarespace/Route 53).
- **Backend**: Deployed via AWS SAM (`sam build && sam deploy`) from the `backend/` directory.
- **Infrastructure stacks**: CloudFormation templates in `infrastructure/` for the full-stack and Amplify resources.

See #[[file:GUARDRAILS.md]] for the canonical deployment workflow and pre-push checklist.

## Directory Structure

```
jabaki/
├── frontend/                    # React/Vite frontend application
│   ├── src/
│   │   ├── pages/               # Page components (one per route)
│   │   │   ├── HomePage.tsx
│   │   │   ├── GardenStudioPage.tsx
│   │   │   ├── RedStudioPage.tsx
│   │   │   ├── GreenStudioPage.tsx
│   │   │   ├── EventsPage.tsx
│   │   │   └── GoodToKnowPage.tsx
│   │   ├── components/          # Shared UI components
│   │   │   ├── Header.tsx
│   │   │   ├── ListingCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   └── seo/             # SEO-related components (MetadataManager)
│   │   ├── utils/               # Utilities (Google Images, Sitemap, Prerendering)
│   │   ├── hooks/               # Custom React hooks (useGoogleImage)
│   │   ├── config/              # App configuration (SEO config)
│   │   ├── data/                # Static data (images.json)
│   │   ├── test/                # Test setup
│   │   ├── App.tsx              # Root component with routing
│   │   ├── main.tsx             # Entry point
│   │   └── i18n.ts             # i18next configuration
│   ├── scripts/                 # Build validation scripts
│   ├── amplify/                 # AWS Amplify backend config
│   ├── vite.config.ts           # Vite configuration
│   ├── vitest.config.ts         # Vitest configuration
│   ├── eslint.config.js         # ESLint flat config
│   ├── tsconfig.app.json        # TypeScript config
│   └── package.json             # Dependencies and scripts
├── backend/                     # Python Lambda backend
│   ├── lambda_function.py       # Lambda handler
│   ├── server.py                # Local dev server
│   ├── template.yaml            # SAM template
│   ├── samconfig.toml           # SAM deployment config
│   ├── deploy.sh                # Linux deploy script
│   └── deploy.ps1               # PowerShell deploy script
├── infrastructure/              # CloudFormation stacks
│   ├── full-stack.yaml          # Full infrastructure template
│   ├── amplify-stack.yaml       # Amplify-specific stack
│   ├── samconfig.toml           # SAM config for infra
│   └── deploy-infrastructure.ps1
├── GUARDRAILS.md                # Production guardrails and deploy checklist
├── .kiro/                       # Kiro IDE configuration
└── *.ps1                        # Windows/PowerShell utility scripts
```

## SEO Strategy

- **Prerendering**: Static HTML generated at build time for search engine crawlers (`PrerenderingService.ts`, `@prerenderer/rollup-plugin`)
- **Sitemap**: Auto-generated via `SitemapGenerator.ts` and `vite-sitemap-plugin.ts`
- **Metadata**: Per-page title/description/OG tags via `react-helmet-async` and `MetadataManager.tsx`
- **SEO config**: Centralized in `src/config/seo.config.ts`

## Key Conventions

- One page component per route in `src/pages/`
- Chakra UI for all styling (no raw CSS except `App.css` and `index.css`)
- Internationalization via `react-i18next` (Dutch primary, English secondary)
- Images fetched from Google Drive via backend API + `useGoogleImage` hook
- ESLint flat config with `typescript-eslint` and `react-hooks` plugins

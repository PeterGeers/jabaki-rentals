---
inclusion: always
---

# Coding Standards

## ESLint Configuration

This project uses ESLint flat config (`eslint.config.js`) with:

- `@eslint/js` — recommended JS rules
- `typescript-eslint` — recommended TypeScript rules
- `eslint-plugin-react-hooks` — enforces Rules of Hooks
- `eslint-plugin-react-refresh` — Vite HMR compatibility

```js
// eslint.config.js (flat config)
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
```

Run lint: `npx eslint --no-warn-ignored <file>`

## File Naming & Organization

### Components — PascalCase
- `src/components/Header.tsx`
- `src/components/ListingCard.tsx`
- `src/components/SearchBar.tsx`
- `src/components/BookingForm.tsx`
- `src/components/seo/MetadataManager.tsx`

### Pages — PascalCase with `Page` suffix
One file per route in `src/pages/`:
- `HomePage.tsx`
- `EventsPage.tsx`
- `GoodToKnowPage.tsx`
- `GardenStudioPage.tsx`
- `RedStudioPage.tsx`
- `GreenStudioPage.tsx`

### Utilities — camelCase
- `src/utils/googleImages.ts`
- `src/utils/googleImageApi.ts`
- `src/utils/SitemapGenerator.ts` (class-based utilities use PascalCase)
- `src/utils/PrerenderingService.ts`
- `src/utils/vite-sitemap-plugin.ts` (Vite plugins use kebab-case)

### Hooks — camelCase with `use` prefix
- `src/hooks/useGoogleImage.ts`

### Tests — co-located with `.test.ts` or `.test.tsx` suffix
- `src/utils/googleImages.test.ts`
- `src/components/seo/MetadataManager.test.ts`
- `src/config/seo.config.test.ts`

## Component Patterns

### Chakra UI for Styling
Use Chakra UI components for layout and styling. No raw CSS except `App.css` and `index.css`.

```tsx
import { Box, Container, Text, SimpleGrid, VStack, Flex, HStack } from '@chakra-ui/react'

const MyComponent = () => (
  <Box bg="gray.50" py={16}>
    <Container maxW="1200px">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {/* responsive grid */}
      </SimpleGrid>
    </Container>
  </Box>
)
```

### Page Structure
Each page is a default-exported functional component:

```tsx
import { Box, Container, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const MyPage = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Container maxW="1200px" py={16}>
        <Text fontSize="3xl" fontWeight="bold">{t('Page Title')}</Text>
      </Container>
    </Box>
  )
}

export default MyPage
```

### Routing
Routes are defined in `App.tsx` using `react-router-dom`:
```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/events" element={<EventsPage />} />
  <Route path="/good-to-know" element={<GoodToKnowPage />} />
  <Route path="/red-studio" element={<RedStudioPage />} />
  <Route path="/green-studio" element={<GreenStudioPage />} />
  <Route path="/garden-studio" element={<GardenStudioPage />} />
</Routes>
```

## Internationalization (i18n)

Uses `react-i18next` with inline translation resources in `src/i18n.ts`.

### Pattern
```tsx
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()
  return <Text>{t('Translation key')}</Text>
}
```

### Supported languages
- English (`en`) — default
- Dutch (`nl`)
- German (`de`)

### Translation key conventions
- Simple keys for general UI: `"Book Now"`, `"Events"`, `"Good to know"`
- Dotted keys for property-specific content: `"gardenhouse.space.title"`, `"red-studio.description.text"`
- Image name keys for accommodation photos: `"slaapbank"`, `"dakterrasb"`, `"voordeur"`

## Image Handling — Google Drive API

Images are stored in Google Drive and served via a backend Lambda API that converts file IDs to public `lh3.googleusercontent.com` URLs.

### Utility function (`src/utils/googleImages.ts`)
```tsx
import { getGoogleImageUrl } from './utils/googleImages'

// Returns a publicly accessible URL from a Google Drive file ID
const url = await getGoogleImageUrl(fileId)
```

- In production, calls the AWS API Gateway endpoint
- In development, uses relative `/api/google-image/{fileId}` path

### API utility (`src/utils/googleImageApi.ts`)
```tsx
import { generateLh3Url, createLh3Url } from './utils/googleImageApi'

// Server-side generation via POST /api/generate-lh3
const url = await generateLh3Url(fileId)

// Client-side fallback (direct lh3 URL construction)
const directUrl = createLh3Url(fileId, 800)
```

### Hook (`src/hooks/useGoogleImage.ts`)
```tsx
import { useGoogleImage } from '../hooks/useGoogleImage'

const MyComponent = ({ imageFileId }: { imageFileId: string }) => {
  const { imageUrl, loading, error } = useGoogleImage(imageFileId)

  if (loading) return <Spinner />
  return <Image src={imageUrl} />
}
```

### Image data
Property image file IDs are stored in `src/data/images.json`, keyed by property and room/feature name.

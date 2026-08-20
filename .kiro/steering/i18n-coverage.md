---
inclusion: fileMatch
fileMatchPattern: "{frontend/src/i18n.ts,frontend/src/pages/**,frontend/src/components/**}"
---

# Internationalization (i18n) Guidelines

## Supported Languages

All user-facing text must be translated into all three languages:
- **English** (`en`) — default/fallback
- **Dutch** (`nl`) — primary audience
- **German** (`de`) — secondary audience

## Adding New Translation Keys

When adding a new `t('...')` call in a component or page:
1. Add the key to ALL three language sections in `src/i18n.ts`
2. Use the English text as the key name (e.g., `t('Book Now')`)
3. Provide actual Dutch and German translations (not just the English text)

## Key Naming Conventions

- Simple UI keys: `"Book Now"`, `"Events"`, `"Good to know"`
- Property-specific dotted keys: `"gardenhouse.space.title"`, `"red-studio.description.text"`
- Image name keys (for alt text): `"slaapbank"`, `"dakterrasb"`, `"voordeur"`

## Common Mistakes to Avoid

- Do NOT leave `nl` or `de` values as the English text — provide real translations
- Do NOT use interpolation without documenting the variables (e.g., `{{count}}`)
- Do NOT add keys to one language section without adding to all three
- Keep translation resources in `src/i18n.ts` (inline, no external JSON files)

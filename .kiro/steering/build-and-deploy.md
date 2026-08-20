---
inclusion: always
---

# Build & Deploy

> Canonical deployment workflow: #[[file:GUARDRAILS.md]]

## Frontend Commands

All frontend commands run from the `frontend/` directory.

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run preview` | Preview production build locally |

### Build

| Command | Description |
|---------|-------------|
| `npm run build` | TypeScript compile (`tsc -b`) then Vite build |
| `npm run build:validate` | Build + run `scripts/validate-build.js` post-build checks |
| `npm run validate-build` | Run build validation script standalone |

### Testing

| Command | Description |
|---------|-------------|
| `npm run test` | Vitest in interactive watch mode |
| `npm run test:run` | Vitest single run (CI-friendly) |

### Linting

| Command | Description |
|---------|-------------|
| `npm run lint` | ESLint across the project (flat config) |

## Backend Commands

Backend lives in `backend/`. Uses AWS SAM (Python 3.12, Lambda).

| Command | Description |
|---------|-------------|
| `sam build` | Build the Lambda function from `template.yaml` |
| `sam deploy --resolve-s3` | Deploy to AWS (stack: `jabaki-backend`, region: `eu-west-1`) |
| `sam local invoke` | Test Lambda locally |
| `./deploy.sh` | Combined build + deploy script (bash) |

SAM config is in `backend/samconfig.toml` — confirms changeset before deploying.

## Testing Workflow

Follow this sequence before pushing to production:

1. **Unit tests** — `cd frontend && npm run test:run`
2. **Build validation** — `cd frontend && npm run build:validate`
3. **Backend API test** — `./test-backend.ps1` (verifies endpoints, image generation, response times)
4. **Manual verification** — `npm run dev` and check all pages, navigation, images, language switching

All four steps must pass before deploying. See #[[file:GUARDRAILS.md]] for rollback procedures and incident response.

## Deployment

### Frontend (automatic)
Push to `main` triggers AWS Amplify auto-build and deploy. Monitor via the Amplify console.

### Backend (manual)
```bash
cd backend
sam build
sam deploy --resolve-s3
```

Or use the deploy script: `cd backend && ./deploy.sh`

### Safe deployment checklist
- One feature per commit with a descriptive message
- Complete the full testing workflow above
- Monitor Amplify build logs after push
- Keep the previous working commit hash for rollback

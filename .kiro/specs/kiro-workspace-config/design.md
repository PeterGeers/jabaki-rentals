# Design: Kiro Workspace Configuration

## Architecture

```
.kiro/
├── steering/
│   ├── project-overview.md       # Always included — tech stack & architecture
│   ├── build-and-deploy.md       # Always included — commands & workflows
│   └── coding-standards.md       # Always included — TypeScript/React conventions
├── hooks/
│   ├── lint-on-save.json         # PostFileSave → eslint on .ts/.tsx files
│   ├── test-after-task.json      # PostTaskExec → vitest run
│   └── protect-config.json       # PreToolUse → confirm writes to critical files
└── settings/
    └── permissions.yaml          # Workspace-level command permissions
```

## Steering Files Design

### project-overview.md
- Project name, domain (jabaki.nl), purpose (vacation rental listings)
- Tech stack: React 18, Vite 7, TypeScript 5, Chakra UI, i18next, react-router-dom
- Backend: Python 3.12, AWS SAM, Lambda, API Gateway
- Hosting: AWS Amplify (frontend), Lambda + API Gateway (backend)
- Key directories: `frontend/src/pages/`, `frontend/src/components/`, `backend/`
- SEO: prerendering, sitemap generation, react-helmet-async

### build-and-deploy.md
- References `#[[file:GUARDRAILS.md]]` for the canonical deployment workflow
- Lists all npm scripts with descriptions
- Documents backend SAM commands
- Documents the testing workflow (unit tests → build → backend test → manual test)

### coding-standards.md
- ESLint flat config with typescript-eslint and react-hooks
- Component file naming (PascalCase for components, camelCase for utilities)
- Page structure pattern (one file per page in `src/pages/`)
- Chakra UI for styling (no raw CSS except `App.css` and `index.css`)
- i18n pattern using react-i18next
- Image handling via Google Drive API utility

## Hooks Design

### lint-on-save.json
- **Trigger**: `PostFileSave`
- **Matcher**: `\.(ts|tsx)$`
- **Action**: `npx eslint --no-warn-ignored {filePath}` (command type)
- **Rationale**: Catch lint errors immediately, not just at build time

### test-after-task.json
- **Trigger**: `PostTaskExec`
- **Action**: `cd frontend && npx vitest run --reporter=verbose` (command type)
- **Rationale**: Validate each completed task doesn't break existing tests

### protect-config.json
- **Trigger**: `PreToolUse`
- **Matcher**: `fs_write|str_replace`
- **Action**: Agent prompt reminding to verify changes to infrastructure/config files (agent type)
- **Rationale**: Extra scrutiny on vite.config.ts, template.yaml, deploy scripts, and samconfig.toml

## Permissions Design

### permissions.yaml structure
```yaml
version: v1
rules:
  # Safe development commands — always allow
  - capability: shell
    match: ["npm run *", "npx vitest *", "npx eslint *", "tsc *", "node *"]
    effect: allow

  # Safe git read commands — always allow
  - capability: shell
    match: ["git status*", "git log*", "git diff*", "git branch*", "git show*"]
    effect: allow

  # Destructive commands — always deny
  - capability: shell
    match: ["rm -rf *", "git push --force*", "git reset --hard*", "sam delete*"]
    effect: deny

  # Deployment commands — require approval each time
  - capability: shell
    match: ["sam deploy*", "sam build*", "aws s3 *", "*.ps1"]
    effect: ask
```

## Error Handling
- Lint hook: non-zero exit from eslint is informational only (won't block saves)
- Test hook: non-zero exit from vitest surfaces failures but doesn't block task completion
- Protect-config hook: uses agent prompt (not blocking) to add awareness without interrupting flow

## Constraints
- All shell commands must run in WSL (the user's configured shell)
- Paths in hooks use Unix-style paths since execution happens in WSL
- Frontend commands run from the `frontend/` working directory

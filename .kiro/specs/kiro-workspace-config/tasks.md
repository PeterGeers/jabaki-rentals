# Tasks: Kiro Workspace Configuration

## Task 1: Create project overview steering file

- [x] Create `.kiro/steering/project-overview.md`
- [x] Document tech stack (React 18, Vite 7, TypeScript 5, Chakra UI, i18next)
- [x] Document architecture (Amplify frontend, SAM Lambda backend, Google Drive images)
- [x] Document directory structure and key file locations
- [x] Document domain (jabaki.nl) and hosting setup

## Task 2: Create build and deploy steering file

- [x] Create `.kiro/steering/build-and-deploy.md`
- [x] Reference GUARDRAILS.md via `#[[file:GUARDRAILS.md]]`
- [x] Document all frontend npm scripts (dev, build, build:validate, test, test:run, lint, preview)
- [x] Document backend SAM commands (sam build, sam deploy)
- [x] Document the full testing workflow sequence

## Task 3: Create coding standards steering file

- [x] Create `.kiro/steering/coding-standards.md`
- [x] Document ESLint configuration (flat config, typescript-eslint, react-hooks)
- [x] Document file naming and organization conventions
- [x] Document component patterns (Chakra UI, page structure, i18n)
- [x] Document image handling pattern (Google Drive API)

## Task 4: Create lint-on-save hook

- [x] Create `.kiro/hooks/lint-on-save.json`
- [x] Configure PostFileSave trigger with `\.(ts|tsx)$` matcher
- [x] Use command action running eslint on the saved file
- [x] Verify JSON schema compliance

## Task 5: Create test-after-task hook

- [x] Create `.kiro/hooks/test-after-task.json`
- [x] Configure PostTaskExec trigger (no matcher needed)
- [x] Use command action running `npx vitest run` from frontend directory
- [ ] Verify JSON schema compliance

## Task 6: Create protect-config hook

- [x] Create `.kiro/hooks/protect-config.json`
- [x] Configure PreToolUse trigger with `fs_write|str_replace` matcher
- [x] Use agent action with prompt about verifying changes to critical config files
- [ ] Verify JSON schema compliance

## Task 7: Create workspace permissions file

- [x] Create `.kiro/settings/permissions.yaml`
- [x] Add allow rules for development commands (npm, vitest, eslint, tsc, node)
- [x] Add allow rules for safe git commands (status, log, diff, branch, show)
- [x] Add deny rules for destructive commands (rm -rf, force push, reset hard, sam delete)
- [x] Add ask rules for deployment commands (sam deploy, sam build, aws s3, .ps1 scripts)

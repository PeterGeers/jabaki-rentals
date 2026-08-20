# Tasks: Kiro Workspace Configuration

## Task 1: Create project overview steering file
- [ ] Create `.kiro/steering/project-overview.md`
- [ ] Document tech stack (React 18, Vite 7, TypeScript 5, Chakra UI, i18next)
- [ ] Document architecture (Amplify frontend, SAM Lambda backend, Google Drive images)
- [ ] Document directory structure and key file locations
- [ ] Document domain (jabaki.nl) and hosting setup

## Task 2: Create build and deploy steering file
- [ ] Create `.kiro/steering/build-and-deploy.md`
- [ ] Reference GUARDRAILS.md via `#[[file:GUARDRAILS.md]]`
- [ ] Document all frontend npm scripts (dev, build, build:validate, test, test:run, lint, preview)
- [ ] Document backend SAM commands (sam build, sam deploy)
- [ ] Document the full testing workflow sequence

## Task 3: Create coding standards steering file
- [ ] Create `.kiro/steering/coding-standards.md`
- [ ] Document ESLint configuration (flat config, typescript-eslint, react-hooks)
- [ ] Document file naming and organization conventions
- [ ] Document component patterns (Chakra UI, page structure, i18n)
- [ ] Document image handling pattern (Google Drive API)

## Task 4: Create lint-on-save hook
- [ ] Create `.kiro/hooks/lint-on-save.json`
- [ ] Configure PostFileSave trigger with `\.(ts|tsx)$` matcher
- [ ] Use command action running eslint on the saved file
- [ ] Verify JSON schema compliance

## Task 5: Create test-after-task hook
- [ ] Create `.kiro/hooks/test-after-task.json`
- [ ] Configure PostTaskExec trigger (no matcher needed)
- [ ] Use command action running `npx vitest run` from frontend directory
- [ ] Verify JSON schema compliance

## Task 6: Create protect-config hook
- [ ] Create `.kiro/hooks/protect-config.json`
- [ ] Configure PreToolUse trigger with `fs_write|str_replace` matcher
- [ ] Use agent action with prompt about verifying changes to critical config files
- [ ] Verify JSON schema compliance

## Task 7: Create workspace permissions file
- [ ] Create `.kiro/settings/permissions.yaml`
- [ ] Add allow rules for development commands (npm, vitest, eslint, tsc, node)
- [ ] Add allow rules for safe git commands (status, log, diff, branch, show)
- [ ] Add deny rules for destructive commands (rm -rf, force push, reset hard, sam delete)
- [ ] Add ask rules for deployment commands (sam deploy, sam build, aws s3, .ps1 scripts)

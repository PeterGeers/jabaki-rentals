# Requirements: Kiro Workspace Configuration

## Prerequisites

> **Run spec `migrate-to-linux` first.** This spec assumes the project lives at `/home/peter/projects/jabaki` on the Linux filesystem, with terminals opening in the project root natively.

## Overview

Set up Kiro IDE workspace configuration for the JaBaKi project — a vacation rental website (jabaki.nl) with a React/Vite/TypeScript frontend hosted on AWS Amplify and a Python/SAM Lambda backend. The goal is to add steering files, agent hooks, and permissions that match the project's existing workflows and guardrails.

## Functional Requirements

### FR-1: Steering Files

Create `.kiro/steering/*.md` files that provide Kiro with persistent project context:

- **FR-1.1**: Project overview steering — document the tech stack, architecture, and key conventions (React 18, Vite, Chakra UI, TypeScript, i18n, AWS Amplify hosting, SAM Lambda backend).
- **FR-1.2**: Build & deploy steering — document all build/deploy/test commands for frontend and backend, referencing the existing `GUARDRAILS.md` workflow.
- **FR-1.3**: Coding standards steering — document TypeScript/React conventions used in this project (ESLint config, component patterns, file organization).

### FR-2: Agent Hooks

Create `.kiro/hooks/*.json` hook files to automate quality checks:

- **FR-2.1**: Post-save lint hook — run ESLint on TypeScript/TSX files after save.
- **FR-2.2**: Post-task-execution test hook — run `vitest run` after completing a spec task to validate nothing is broken.
- **FR-2.3**: Pre-tool-use build validation hook — prompt for confirmation before write operations touch `vite.config.ts`, `template.yaml`, or deploy scripts (high-risk files).

### FR-3: Permissions

Create a workspace-level permissions file to pre-approve safe commands and deny dangerous ones:

- **FR-3.1**: Allow common development commands — `npm run build`, `npm run lint`, `npm run test:run`, `vitest run`, `tsc`, `vite build`.
- **FR-3.2**: Allow safe git commands — `git status`, `git log`, `git diff`, `git branch`.
- **FR-3.3**: Deny destructive commands — `rm -rf`, `git push --force`, `git reset --hard`, `sam delete`.
- **FR-3.4**: Require approval for deployment commands — `sam deploy`, `sam build`, `aws s3 sync`, PowerShell deploy scripts.

## Non-Functional Requirements

- **NFR-1**: All config files must follow the documented Kiro v1 schemas exactly.
- **NFR-2**: Steering files should reference `#[[file:GUARDRAILS.md]]` where appropriate to avoid duplication.
- **NFR-3**: Hook commands must work in a WSL environment (the user's shell).
- **NFR-4**: Configuration should be committed to git so team members benefit.

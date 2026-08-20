# Requirements: Migrate JaBaKi to Linux Filesystem

## Overview
Move the JaBaKi project from the Windows filesystem (`C:\Users\peter\aws\JaBaKi`) to the WSL Linux filesystem (`/home/peter/projects/jabaki`). This eliminates cross-filesystem performance issues, path confusion, and unreliable file watchers, bringing JaBaKi in line with the myAdmin project setup.

## Context
- All Kiro/VS Code terminals open in WSL Ubuntu
- The myAdmin project already lives on Linux and works smoothly
- JaBaKi uses Node.js (available in WSL), AWS SAM, and AWS CLI
- Deploy scripts are currently PowerShell (.ps1) but SAM/AWS CLI can run from bash

## Functional Requirements

### FR-1: Move Repository
- **FR-1.1**: Clone or copy the git repository to `/home/peter/projects/jabaki`
- **FR-1.2**: Preserve full git history
- **FR-1.3**: Verify all files are intact after move
- **FR-1.4**: Update git remote if needed (origin should remain the same)

### FR-2: Convert Deploy Scripts
- **FR-2.1**: Convert `backend/deploy.ps1` to `backend/deploy.sh` (bash equivalent using `sam build` and `sam deploy`)
- **FR-2.2**: Convert `frontend/deploy-aws.ps1` to `frontend/deploy-aws.sh` (bash equivalent using `aws s3` commands)
- **FR-2.3**: Make deploy scripts executable (`chmod +x`)
- **FR-2.4**: Keep original .ps1 files for reference until confirmed working, then remove

### FR-3: Install Missing CLI Tools in WSL
- **FR-3.1**: Verify or install AWS CLI in WSL Ubuntu
- **FR-3.2**: Verify or install SAM CLI in WSL Ubuntu
- **FR-3.3**: Verify Node.js/npm work correctly (already confirmed v22.22.1)

### FR-4: Verify Project Functionality
- **FR-4.1**: `npm install` completes in frontend/
- **FR-4.2**: `npm run build` succeeds
- **FR-4.3**: `npm run lint` passes
- **FR-4.4**: `npm run test:run` passes
- **FR-4.5**: `npm run dev` starts the dev server correctly
- **FR-4.6**: `sam build` succeeds in backend/

### FR-5: Update Workspace
- **FR-5.1**: Open the new Linux path in VS Code/Kiro as the workspace
- **FR-5.2**: Verify terminals open in the project directory
- **FR-5.3**: Update any absolute paths in config files (samconfig.toml, etc.)

## Non-Functional Requirements

- **NFR-1**: Zero git history loss — all commits, branches, and tags preserved
- **NFR-2**: The Windows copy should remain until Linux version is fully verified (safe rollback)
- **NFR-3**: File permissions should be correct for Linux (executable scripts, no Windows line endings in shell scripts)

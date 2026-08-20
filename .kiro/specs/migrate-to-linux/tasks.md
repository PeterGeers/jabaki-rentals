# Tasks: Migrate JaBaKi to Linux Filesystem

## Task 1: Clone/copy repository to Linux filesystem
- [ ] Determine git remote URL (`git remote -v`)
- [ ] Clone repo to `/home/peter/projects/jabaki` (or copy if no remote)
- [ ] Verify git history is intact (`git log --oneline -10`)
- [ ] Verify all branches are present (`git branch -a`)
- [ ] Set `git config core.autocrlf input` in new repo

## Task 2: Convert PowerShell deploy scripts to bash
- [ ] Create `backend/deploy.sh` with sam build/deploy commands
- [ ] Create `frontend/deploy-aws.sh` with aws s3 commands
- [ ] Make both scripts executable (`chmod +x`)
- [ ] Verify scripts have LF line endings

## Task 3: Install/verify AWS CLI and SAM CLI in WSL
- [ ] Check if AWS CLI is available (`aws --version`)
- [ ] Install AWS CLI if missing
- [ ] Check if SAM CLI is available (`sam --version`)
- [ ] Install SAM CLI if missing
- [ ] Configure AWS credentials (`aws configure` or copy from Windows `~/.aws/`)

## Task 4: Install dependencies and verify project
- [ ] Run `npm install` in frontend/
- [ ] Run `npm run build` — verify success
- [ ] Run `npm run lint` — verify passes
- [ ] Run `npm run test:run` — verify tests pass
- [ ] Run `sam build` in backend/ — verify success

## Task 5: Check and update any hardcoded paths
- [ ] Review `backend/samconfig.toml` for Windows paths
- [ ] Review `credentials.json` for path dependencies
- [ ] Review any `.vscode/` settings for Windows paths
- [ ] Update paths if found

## Task 6: Open new workspace and verify terminal behavior
- [ ] Open `/home/peter/projects/jabaki` as VS Code/Kiro workspace
- [ ] Verify terminal opens in project root (not myAdmin)
- [ ] Verify `npm run dev` starts with working HMR
- [ ] Verify file changes trigger hot reload

## Task 7: Clean up (after full verification)
- [ ] Remove Windows copy at `C:\Users\peter\aws\JaBaKi` (only after everything confirmed working)
- [ ] Remove original .ps1 deploy scripts from Linux repo (optional, keep if useful)
- [ ] Update any bookmarks or documentation referencing the old path

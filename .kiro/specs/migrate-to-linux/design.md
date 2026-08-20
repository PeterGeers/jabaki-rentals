# Design: Migrate JaBaKi to Linux Filesystem

## Migration Strategy

**Approach**: Git clone from remote (cleanest method — avoids copying node_modules, .venv, build artifacts)

```
/home/peter/projects/
├── myAdmin/          # Existing Linux project
└── jabaki/           # New location for JaBaKi
    ├── backend/
    ├── frontend/
    ├── infrastructure/
    └── .kiro/
```

## Step-by-Step Plan

### Phase 1: Move the code
1. `git clone <remote-url> /home/peter/projects/jabaki` from the existing remote
2. If no remote exists, use `cp -r /mnt/c/Users/peter/aws/JaBaKi /home/peter/projects/jabaki` then clean up artifacts
3. Verify: `git log --oneline -5` matches the Windows copy

### Phase 2: Convert deploy scripts

#### backend/deploy.sh (replaces deploy.ps1)
```bash
#!/bin/bash
set -e
echo "Deploying JaBaKi Backend to AWS Lambda..."

echo "Building SAM application..."
sam build

echo "Deploying to AWS..."
sam deploy --resolve-s3

echo "Deployment complete!"
```

#### frontend/deploy-aws.sh (replaces deploy-aws.ps1)
```bash
#!/bin/bash
set -e
echo "Deploying JaBaKi Frontend to AWS S3..."

echo "Building frontend..."
npm run build

BUCKET_NAME="jabaki-frontend-$(date +%s)"
echo "Creating S3 bucket: $BUCKET_NAME"
aws s3 mb "s3://$BUCKET_NAME" --region eu-west-1

aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document index.html

echo "Uploading files to S3..."
aws s3 sync dist/ "s3://$BUCKET_NAME" --delete

aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [{
    \"Sid\": \"PublicReadGetObject\",
    \"Effect\": \"Allow\",
    \"Principal\": \"*\",
    \"Action\": \"s3:GetObject\",
    \"Resource\": \"arn:aws:s3:::$BUCKET_NAME/*\"
  }]
}"

echo "Frontend deployed!"
echo "Website URL: http://$BUCKET_NAME.s3-website-eu-west-1.amazonaws.com"
```

### Phase 3: Install CLI tools (if missing)

**AWS CLI:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**SAM CLI:**
```bash
wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
unzip aws-sam-cli-linux-x86_64.zip -d sam-installation
sudo ./sam-installation/install
```

### Phase 4: Reinstall dependencies and verify
```bash
cd /home/peter/projects/jabaki/frontend
npm install          # Fresh install (faster on native Linux filesystem)
npm run build        # Verify build
npm run lint         # Verify linting
npm run test:run     # Verify tests
```

### Phase 5: Switch workspace
- Open `/home/peter/projects/jabaki` in VS Code/Kiro
- Verify terminal opens in project root
- Verify file watchers work (vite dev server with HMR)

## Files That May Need Path Updates
- `backend/samconfig.toml` — check for absolute Windows paths
- `credentials.json` — check if path-dependent
- `.vscode/` settings — may reference Windows paths

## Rollback Plan
- Windows copy remains at `C:\Users\peter\aws\JaBaKi` until fully verified
- If anything fails, simply reopen the Windows workspace
- Once confirmed working, the Windows copy can be deleted

## Line Ending Strategy
- All new `.sh` files use LF line endings (Unix)
- Run `git config core.autocrlf input` in the new repo to prevent CRLF issues
- Existing files: git will handle conversion naturally since the repo likely has `.gitattributes` or defaults

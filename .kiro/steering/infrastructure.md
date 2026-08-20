---
inclusion: fileMatch
fileMatchPattern: "{infrastructure/**,backend/template.yaml,backend/samconfig.toml,backend/deploy.*}"
---

# Infrastructure & SAM Guidelines

## CloudFormation / SAM Template Rules

- Always validate templates before deploying: `sam validate` in the backend/ directory
- Use `Parameters` for environment-specific values (never hardcode account IDs or ARNs)
- Keep `Globals` section for shared Lambda configuration (timeout, runtime, CORS)
- Current runtime: Python 3.12
- Current region: eu-west-1
- Stack name: `jabaki-backend`

## Deployment Safety

- Always run `sam build` before `sam deploy`
- SAM is configured to confirm changesets before executing (`confirm_changeset = true` in samconfig.toml)
- Never deploy directly to production without testing locally first with `sam local invoke`
- Keep the deploy scripts (`deploy.sh`, `deploy.ps1`) in sync if modifying deployment steps

## API Gateway Configuration

- CORS is configured globally in the SAM template Globals section
- AllowOrigin is set to `'*'` — tighten this for production if needed
- API key authentication is parameterized (default: disabled)

## Rollback

If a deployment fails or causes issues:
1. Check CloudFormation events in AWS Console
2. SAM will automatically roll back failed stack updates
3. For manual rollback, deploy the previous known-good commit

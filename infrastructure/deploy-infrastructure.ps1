# JaBaKi Infrastructure Deployment Script
Write-Host "Deploying JaBaKi Full Stack Infrastructure..." -ForegroundColor Green

# Parameters
$StackName = "jabaki-infrastructure"
$GitHubRepo = Read-Host "Enter your GitHub repository URL (https://github.com/username/repo)"
$GitHubToken = Read-Host "Enter your GitHub personal access token" -AsSecureString
$DomainName = "jabaki.nl"

# Convert secure string to plain text for AWS CLI
$GitHubTokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($GitHubToken))

Write-Host "Deploying CloudFormation stack..." -ForegroundColor Yellow

# Deploy the stack
aws cloudformation deploy `
  --template-file amplify-stack.yaml `
  --stack-name $StackName `
  --parameter-overrides `
    GitHubRepo=$GitHubRepo `
    GitHubToken=$GitHubTokenPlain `
    DomainName=$DomainName `
  --capabilities CAPABILITY_IAM

if ($LASTEXITCODE -eq 0) {
    Write-Host "Infrastructure deployment complete!" -ForegroundColor Green
    
    # Get outputs
    Write-Host "Getting stack outputs..." -ForegroundColor Yellow
    aws cloudformation describe-stacks --stack-name $StackName --query 'Stacks[0].Outputs'
} else {
    Write-Host "Infrastructure deployment failed!" -ForegroundColor Red
}
# JaBaKi AWS SAM Deployment Script
Write-Host "Deploying JaBaKi Backend to AWS Lambda..." -ForegroundColor Green

# Build the SAM application
Write-Host "Building SAM application..." -ForegroundColor Yellow
sam build

if ($LASTEXITCODE -eq 0) {
    # Deploy the application
    Write-Host "Deploying to AWS..." -ForegroundColor Yellow
    sam deploy --resolve-s3
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Deployment complete!" -ForegroundColor Green
    } else {
        Write-Host "Deployment failed!" -ForegroundColor Red
    }
} else {
    Write-Host "Build failed! Cannot proceed with deployment." -ForegroundColor Red
}
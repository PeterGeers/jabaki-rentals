# JaBaKi Frontend Starter Script
Write-Host "Starting JaBaKi Frontend..." -ForegroundColor Green
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow

# Navigate to frontend directory if not already there
if (!(Test-Path "package.json")) {
    if (Test-Path "frontend\package.json") {
        Set-Location "frontend"
        Write-Host "Changed to frontend directory: $(Get-Location)" -ForegroundColor Yellow
    } else {
        Write-Host "Error: Cannot find frontend directory or package.json" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Start Vite dev server
Write-Host "Starting Vite dev server..." -ForegroundColor Yellow
npm run dev

Write-Host "Frontend process ended. Press Enter to close..." -ForegroundColor Yellow
Read-Host
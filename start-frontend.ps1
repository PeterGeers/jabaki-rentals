# JaBaKi Frontend Starter Script
Write-Host "Starting JaBaKi Frontend..." -ForegroundColor Green
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow

# Change to frontend directory
Set-Location "frontend"
Write-Host "Changed to frontend directory: $(Get-Location)" -ForegroundColor Yellow

# Start Vite dev server
Write-Host "Starting Vite dev server..." -ForegroundColor Yellow
npm run dev

Write-Host "Frontend process ended. Press Enter to close..." -ForegroundColor Yellow
Read-Host
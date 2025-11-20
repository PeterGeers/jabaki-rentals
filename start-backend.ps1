# JaBaKi Backend Starter Script
Write-Host "Starting JaBaKi Backend..." -ForegroundColor Green
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow

# Change to backend directory
Set-Location "backend"
Write-Host "Changed to backend directory: $(Get-Location)" -ForegroundColor Yellow

# Start Flask server
Write-Host "Starting Flask server..." -ForegroundColor Yellow
python server.py

Write-Host "Backend process ended. Press Enter to close..." -ForegroundColor Yellow
Read-Host
# JaBaKi Full Stack Starter Script
Write-Host "Starting JaBaKi Full Stack Application..." -ForegroundColor Green

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-File", ".\start-backend.ps1"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in separate window
Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-File", ".\start-frontend.ps1"

Write-Host "Both Backend and Frontend are starting in separate windows..." -ForegroundColor Green
Write-Host "Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
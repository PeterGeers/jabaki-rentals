# JaBaKi Full Stack Starter Script
Write-Host "Starting JaBaKi Full Stack Application..." -ForegroundColor Green

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-File", ".\start-backend.ps1"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in current window
Write-Host "Starting Frontend..." -ForegroundColor Yellow
npm run dev
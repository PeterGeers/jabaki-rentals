# JaBaKi Full Stack Starter Script
Write-Host "Starting JaBaKi Backend..." -ForegroundColor Green

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend
Set-Location "$scriptDir\backend"
Start-Process python -ArgumentList "server.py" -WindowStyle Normal

Write-Host "Backend started. Starting Frontend..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Start frontend
Set-Location "$scriptDir\frontend"
npm run dev
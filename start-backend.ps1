# JaBaKi Backend Starter Script
Write-Host "Starting JaBaKi Backend with Python 3.12..." -ForegroundColor Green

# Activate virtual environment and start Flask server
& ".\venv312\Scripts\Activate.ps1"
Set-Location "backend"
& "..\venv312\Scripts\python.exe" server.py
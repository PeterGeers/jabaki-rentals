@echo off
cd /d "C:\Users\peter\aws\JaBaKi"
venv312\Scripts\python.exe -m pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
venv312\Scripts\python.exe generate_photos_json.py
pause
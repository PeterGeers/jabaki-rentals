import json
import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import pickle

SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

def authenticate_google_drive():
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    
    return build('drive', 'v3', credentials=creds)

def find_folder_by_name(service, folder_name, parent_id='root'):
    query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder'"
    if parent_id != 'root':
        query += f" and '{parent_id}' in parents"
    
    results = service.files().list(q=query).execute()
    items = results.get('files', [])
    return items[0]['id'] if items else None

def get_files_in_folder(service, folder_id):
    query = f"'{folder_id}' in parents and mimeType contains 'image/'"
    results = service.files().list(q=query, fields="files(id, name)").execute()
    return results.get('files', [])

def main():
    service = authenticate_google_drive()
    
    folders = ['gardenhouse', 'redstudio', 'greenstudio', 'algemeen']
    properties = {}
    
    for folder_name in folders:
        folder_id = find_folder_by_name(service, folder_name)
        if folder_id:
            files = get_files_in_folder(service, folder_id)
            folder_data = {}
            
            for file in files:
                # Remove file extension and use as key
                photo_name = os.path.splitext(file['name'])[0].lower().replace(' ', '-')
                folder_data[photo_name] = file['id']
            
            # Map folder names to match JSON structure
            json_folder_name = folder_name.replace('redstudio', 'red-studio').replace('greenstudio', 'green-studio')
            properties[json_folder_name] = folder_data
    
    # Create final JSON structure
    output = {"properties": properties}
    
    # Write to JSON file
    with open('frontend/src/data/images.json', 'w') as f:
        json.dump(output, f, indent=4)
    
    print("Photos JSON generated successfully!")
    print(f"Found {sum(len(props) for props in properties.values())} photos across {len(properties)} folders")

if __name__ == "__main__":
    main()
import json
import os
import sys
import argparse
from collections import OrderedDict
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import pickle

SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

def authenticate_google_drive(force_refresh=False):
    creds = None
    
    # Delete token if force refresh is requested
    if force_refresh and os.path.exists('token.pickle'):
        os.remove('token.pickle')
        print("Cleared cached token for fresh authentication...")
    
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
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Generate photos JSON from Google Drive')
    parser.add_argument('--refresh', action='store_true', help='Force refresh by clearing cached authentication token')
    args = parser.parse_args()
    
    service = authenticate_google_drive(force_refresh=args.refresh)
    
    folders = ['gardenhouse', 'redstudio', 'greenstudio', 'algemeen']
    properties = {}
    
    # Define the desired sort order for photo types
    sort_order = ['voordeur', 'bedden', 'badkamer', 'keukenblok', 'zithoek', 'eethoek', 'slaapbank', 'jabakilogo']
    
    for folder_name in folders:
        folder_id = find_folder_by_name(service, folder_name)
        if folder_id:
            files = get_files_in_folder(service, folder_id)
            folder_data = {}
            
            for file in files:
                # Remove file extension and use as key
                photo_name = os.path.splitext(file['name'])[0].lower().replace(' ', '-')
                folder_data[photo_name] = file['id']
            
            # Sort folder_data by the defined sort order
            sorted_folder_data = OrderedDict()
            for item in sort_order:
                if item in folder_data:
                    sorted_folder_data[item] = folder_data[item]
            # Add any remaining items not in sort order
            for item in folder_data:
                if item not in sorted_folder_data:
                    sorted_folder_data[item] = folder_data[item]
            
            # Map folder names to match JSON structure
            json_folder_name = folder_name.replace('redstudio', 'red-studio').replace('greenstudio', 'green-studio')
            properties[json_folder_name] = sorted_folder_data
    
    # Create final JSON structure
    output = {"properties": properties}
    
    # Write to JSON file, preserving OrderedDict order
    with open('frontend/src/data/images.json', 'w') as f:
        json_str = json.dumps(output, indent=4)
        f.write(json_str)
    
    print("Photos JSON generated successfully!")
    print(f"Found {sum(len(props) for props in properties.values())} photos across {len(properties)} folders")

if __name__ == "__main__":
    main()

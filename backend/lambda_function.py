import json
import re

def generate_lh3_url(file_id):
    """Generate lh3.googleusercontent.com URL from Google Drive file ID"""
    # Clean the file ID (remove any URL parts if present)
    clean_file_id = re.sub(r'.*[/=]([a-zA-Z0-9_-]+).*', r'\1', file_id)
    
    # Generate lh3 URL without size parameter
    return f"https://lh3.googleusercontent.com/d/{clean_file_id}"

def handler(event, context):
    """AWS Lambda handler"""
    
    # Get HTTP method and path
    method = event.get('httpMethod', '')
    path = event.get('path', '')
    
    # CORS headers
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
    
    # Handle OPTIONS requests (CORS preflight)
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    # Root endpoint
    if path == '/' or path == '':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'message': 'JaBaKi API is running',
                'endpoints': ['/health', '/api/google-image/<file_id>']
            })
        }
    
    # Health check
    if path == '/health':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'status': 'healthy'})
        }
    
    # Google image URL endpoint
    if path.startswith('/api/google-image/'):
        file_id = path.split('/')[-1]
        if file_id:
            url = generate_lh3_url(file_id)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'url': url})
            }
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'File ID is required'})
            }
    
    # Not found
    return {
        'statusCode': 404,
        'headers': headers,
        'body': json.dumps({'error': 'Not found'})
    }
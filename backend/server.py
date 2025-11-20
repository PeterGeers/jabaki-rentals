from flask import Flask, jsonify, request
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

def generate_lh3_url(file_id):
    """Generate lh3.googleusercontent.com URL from Google Drive file ID"""
    # Clean the file ID (remove any URL parts if present)
    clean_file_id = re.sub(r'.*[/=]([a-zA-Z0-9_-]+).*', r'\1', file_id)
    
    # Generate lh3 URL without size parameter
    return f"https://lh3.googleusercontent.com/d/{clean_file_id}"

@app.route('/api/generate-lh3', methods=['POST'])
def generate_lh3():
    """Generate lh3 URL from Google Drive file ID"""
    data = request.get_json()
    file_id = data.get('fileId')
    
    if not file_id:
        return jsonify({'error': 'File ID is required'}), 400
    
    url = generate_lh3_url(file_id)
    return jsonify({'url': url})

@app.route('/api/google-image/<file_id>')
def get_google_image_url(file_id):
    """Get image URL for file ID"""
    url = generate_lh3_url(file_id)
    return jsonify({'url': url})

@app.route('/')
def root():
    return jsonify({'message': 'JaBaKi API is running', 'endpoints': ['/health', '/api/google-image/<file_id>', '/api/generate-lh3']})

@app.route('/health')
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
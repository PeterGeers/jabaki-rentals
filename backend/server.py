from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

def generate_lh3_url(file_id, size=800):
    """
    Generate lh3.googleusercontent.com URL from Google Drive file ID
    """
    # Clean the file ID (remove any URL parts if present)
    file_id = re.sub(r'.*[/=]([a-zA-Z0-9_-]+).*', r'\1', file_id)
    
    # Generate lh3 URL
    lh3_url = f"https://lh3.googleusercontent.com/d/{file_id}=w{size}-h{size}-c"
    
    return lh3_url

@app.route('/api/generate-lh3', methods=['POST'])
def api_generate_lh3():
    try:
        data = request.get_json()
        file_id = data.get('fileId')
        
        if not file_id:
            return jsonify({'error': 'File ID is required'}), 400
        
        size = data.get('size', 800)
        lh3_url = generate_lh3_url(file_id, size)
        
        return jsonify({
            'file_id': file_id,
            'lh3_url': lh3_url,
            'size': size
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/google-image/<file_id>')
def get_google_image(file_id):
    try:
        lh3_url = generate_lh3_url(file_id)
        return jsonify({
            'file_id': file_id,
            'lh3_url': lh3_url,
            'url': lh3_url
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
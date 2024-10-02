from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from PIL import Image
import pytesseract
import requests  # To communicate with the Rasa server
import re  # Import re for regex

app = Flask(__name__)  # Initialize the Flask application
CORS(app)  # Enable CORS to allow cross-origin requests from the frontend

# Specify the path to Tesseract OCR executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Initialize the SQLite database
def init_db():
    conn = sqlite3.connect('insurance.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        policy_type TEXT,
        consent BOOLEAN,
        data TEXT
    )''')
    conn.commit()
    conn.close()

def parse_extracted_text(text):
    # Initialize the data dictionary
    data = {}
    
    # Regex patterns to match the required fields
    name_pattern = r'Name:\s*([\w\s]+)'
    dob_pattern = r'Date of Birth\s*:\s*(\d{2}/\d{2}/\d{2})'
    phone_pattern = r'Phone No\s*:\s*(\+\d{2}/\d{10})'
    address_pattern = r'Address:\s*(.*)'

    # Search for each field in the text
    name_match = re.search(name_pattern, text)
    dob_match = re.search(dob_pattern, text)
    phone_match = re.search(phone_pattern, text)
    address_match = re.search(address_pattern, text)

    # Update the data dictionary with matched values
    if name_match:
        data['name'] = name_match.group(1).strip()
    if dob_match:
        data['dob'] = dob_match.group(1).strip()
    if phone_match:
        data['phone'] = phone_match.group(1).strip()
    if address_match:
        data['address'] = address_match.group(1).strip()
    
    return data

# Route for scanning documents using OCR
@app.route('/api/scan-doc', methods=['POST'])
def scan_document():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    img = Image.open(file.stream)
    extracted_text = pytesseract.image_to_string(img)

    # Parse the extracted text
    parsed_data = parse_extracted_text(extracted_text)

    return jsonify({"parsed_data": parsed_data}), 200

@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    conn = sqlite3.connect('insurance.db')
    cursor = conn.cursor()

    cursor.execute('''INSERT INTO applications (name, policy_type, consent, data)
                      VALUES (?, ?, ?, ?)''',
                   (data['name'], data['policy_type'], data['consent'], str(data)))  # Store as string

    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 200

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    sender_id = request.json.get('sender', 'default')

    response = requests.post('http://localhost:5005/webhooks/rest/webhook', json={
        "sender": sender_id,
        "message": user_message
    })

    return jsonify(response.json())

if __name__ == '__main__':
    init_db()
    app.run(debug=True)

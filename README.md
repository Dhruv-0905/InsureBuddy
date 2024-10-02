
# Policy Bazaar

**Policy Bazaar** is an AI-powered agent designed to revolutionize insurance accessibility. It helps users understand insurance policies, provides answers to common questions, and assists in filling out application forms through an intuitive interface and document scanning.

## Features

- **Policy Selection:** Users can browse through different insurance policies and select the one that interests them.
- **Policy Explanation:** Detailed breakdown of policy terms and conditions, with pros and cons.
- **NLP-powered Chatbot:** Users can ask common insurance-related questions and get real-time responses.
- **OCR for Document Scanning:** Users can scan documents to auto-fill application forms.
- **Application Form Submission:** Verification and submission of details for insurance applications.
  
## Project Structure

## Installation

### Prerequisites

- [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/) for Python environment management
- Python 3.9+
- Node.js 14+

### Setup Instructions

1. **Clone the repository**:
   ```
   git clone https://github.com/Dhruv-0905/Policy-Bazaar.git
   cd Policy-Bazaar
   ```

2. **Backend (Flask) Setup**:

   - Navigate to the backend folder:
     ```
     cd backend
     ```
   - Create and activate a Conda environment:
     ```
     conda create --name policy-bazaar python=3.9
     conda activate policy-bazaar
     ```
   - Install the dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Run the Flask server:
     ```
     flask run
     ```

3. **Frontend (React) Setup**:

   - Navigate to the frontend folder:
     ```
     cd frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the React development server:
     ```
     npm start
     ```

## Usage

1. Open your browser and go to `http://localhost:3000` to access the Policy Bazaar platform.
2. Browse and select insurance policies.
3. Ask questions via the chatbot about policy details, terms, and coverage.
4. Use the document scanning feature to auto-fill forms.

## Technologies

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Database**: (Your preferred database, e.g., PostgreSQL)
- **OCR**: Tesseract (for document scanning)
- **Natural Language Processing**: Rasa (for chatbot functionality)

## Future Enhancements

- Integration with more insurance providers.
- Advanced chatbot features with deep learning.
- Deployment on cloud services for scalability.

## Contributing

Contributions are welcome! Please open an issue or create a pull request.

##Special Mentions
-WildVamp

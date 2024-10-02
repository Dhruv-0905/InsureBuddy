import React, { useState } from 'react';
import axios from 'axios';
import './FormFilling.css';  // Import the CSS file

const FormFilling = ({ policyType }) => {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        phone: '',
        address: '',
        consent: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/submit-form', {
                ...formData,
                policy_type: policyType.name,
            });
            console.log(response.data.message); // Handle success message
            setIsSubmitted(true); // Set submission state to true
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleOCR = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:5000/api/scan-doc', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setExtractedText(response.data.extracted_text);

                // Set the form data using the parsed data
                const parsedData = response.data.parsed_data; // Assuming parsed_data is returned from the server
                setFormData(prevData => ({
                    ...prevData,
                    name: parsedData.name || '',
                    dob: parsedData.dob || '',
                    phone: parsedData.phone || '',
                    address: parsedData.address || '',
                }));

            } catch (error) {
                console.error('Error processing OCR:', error);
            }
        }
    };

    if (isSubmitted) {
        return (
            <div className="form-container">
                <h2>Form Submitted Successfully!</h2>
                <p>Thank you for submitting your {policyType.name} application. You can now close the application.</p>
            </div>
        );
    }

    return (
        <div className="form-container"> {/* Apply the container class */}
            <h2>Fill Out Your {policyType.name} Application</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="button" onClick={handleOCR}>Scan Document</button>
            {extractedText && (
                <div>
                    <h3>Extracted Information:</h3>
                    <p>{extractedText}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Date of Birth (dd/mm/yyyy)"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                />
                <label>
                    <input 
                        type="checkbox" 
                        checked={formData.consent} 
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} 
                    />
                    I consent to store my information for future applications, verify the scanned details.
                </label>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default FormFilling;

import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
                sender: 'user',
                message: input,
            });

            const botMessages = response.data;
            setMessages((prevMessages) => [
                ...prevMessages,
                ...botMessages.map((msg) => ({
                    sender: 'bot',
                    text: msg.text,
                })),
            ]);
            setError(''); // Clear any previous error message
        } catch (error) {
            setError('Model is Under Development');
            console.error('Error sending message to Rasa:', error);
        }

        setInput('');
    };

    return (
        <div className={`chatbot ${isOpen ? 'open' : ''}`}>
            <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
                Chat with Insure Buddy
            </div>
            {isOpen && (
                <div className="chat-window">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender}>
                            {msg.text}
                        </div>
                    ))}
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={sendMessage}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

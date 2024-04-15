"use client"
// Chatbot.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Chatbot.module.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const toggle = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
        if (!isOpen) {
            setChatHistory([{ sender: 'chatbot', message: 'Hi, I am Chatbot' }]);
        }
    };
    

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            setChatHistory([...chatHistory, { sender: 'user', message }]);
            setMessage('');
        }
    };

    return (
        <div className={styles.chatbotContainer}>
            <div className={styles.chatIcon} onClick={toggle}>
                <img src="/botLogo.png" width={60} alt="Chat Icon" />
            </div>
            {isOpen && (
                <div className={styles.chatPopup}>
                    <div className={styles.header}>
                        <div className={styles.closeButton} onClick={toggle}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className={styles.topButton}>
                            Chat
                        </div>
                    </div>
                    <div className={styles.chatContent}>
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={chat.sender === 'chatbot' ? styles.chatbotMessage : styles.userMessage}>
                                {chat.message}
                            </div>
                        ))}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            value={message}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className={styles.messageInput}
                        />
                        <button className={styles.sendButton} onClick={handleSend}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactFormModal.css';

const ContactFormModal = ({ onClose }) => {
    const formRef = useRef(null);
    const [statusMessage, setStatusMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        // Replace the placeholders with your actual EmailJS service/template/keys
        emailjs.sendForm(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            formRef.current,
            'YOUR_PUBLIC_KEY'
        ).then(
            (result) => {
                console.log(result.text);
                setStatusMessage('Email sent successfully!');
            },
            (error) => {
                console.log(error.text);
                setStatusMessage('Oops! Something went wrong.');
            }
        );
    };

    // If user clicks outside the modal-content, close the modal
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('contact-form-overlay')) {
            onClose();
        }
    };

    return (
        <div className="contact-form-overlay" onClick={handleOverlayClick}>
            <div className="contact-form-container">
                <button className="close-modal-btn" onClick={onClose}>×</button>

                <h2>Contact Me</h2>

                <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                    <label htmlFor="user_name">Name:</label>
                    <input id="user_name" type="text" name="user_name" required />

                    <label htmlFor="user_email">Email:</label>
                    <input id="user_email" type="email" name="user_email" required />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required />

                    <button type="submit" className="submit-button">Send</button>
                </form>

                {statusMessage && <p className="status-message">{statusMessage}</p>}
            </div>
        </div>
    );
};

export default ContactFormModal;

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactFormModal.css'; // Updated styles

const ContactFormModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace these with your own values from EmailJS
        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                to_name: 'Oliver Wilde',
                from_name: formData.name,
                message: formData.message,
                reply_to: formData.email
            },
            'YOUR_USER_ID'
        ).then(
            (result) => {
                console.log(result.text);
                onClose();
            },
            (error) => {
                console.log(error.text);
            }
        );
    };

    // Click outside the modal card to close
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <button className="modal-close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal-form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ContactFormModal;

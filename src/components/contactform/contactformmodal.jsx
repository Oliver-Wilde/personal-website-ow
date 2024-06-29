import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../../components/contactform/contactformmodal.css';

const ContactFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            'service_kn5578x', // Replace with your EmailJS service ID
            'template_1mg867v', // Replace with your EmailJS template ID
            formData,
            'A-pEaxFyfvjyIC14X' // Replace with your EmailJS user ID
        ).then((result) => {
            console.log(result.text);
            onClose();
        }, (error) => {
            console.log(error.text);
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>Contact Me</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Message:
                        <textarea name="message" value={formData.message} onChange={handleChange} required />
                    </label>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ContactFormModal;

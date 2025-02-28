import React, { useState } from 'react';
import './Contact.css';
import ContactFormModal from '../../components/ContactFormModal/ContactFormModal';

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="contact-container">
            <h1>Contact Me</h1>
            <p>
                Feel free to reach out via email, LinkedIn, or any other preferred method.
            </p>
            <p>
                <strong>Email:</strong> your-email@example.com
            </p>

            {/* Button to open the modal */}
            <button className="open-modal-btn" onClick={openModal}>Contact Form</button>

            {isModalOpen && <ContactFormModal onClose={closeModal} />}
        </div>
    );
};

export default Contact;

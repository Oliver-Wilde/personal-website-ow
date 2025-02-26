import React from 'react';
import './ResumeModal.css';
import cvImage from '../../assets/cv.jpg'; // adjust path if needed

const ResumeModal = ({ onClose }) => {
    // Close if user clicks outside the image
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            {/* "X" close button, top-right */}
            <button className="modal-close-button" onClick={onClose}>×</button>

            {/* The CV image fills the screen as much as possible */}
            <img
                src={cvImage}
                alt="CV"
                className="modal-cv-image"
            />
        </div>
    );
};

export default ResumeModal;

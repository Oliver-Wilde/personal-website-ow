import React from 'react';
import { motion } from 'framer-motion';
import './monitortransition.css';
import ContactFormModal from '../../components/contactform/contactformmodal';

const MonitorTransition = ({ isOpen, onClose }) => {
    return (
        <motion.div
            className="monitor-transition"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            {isOpen && <ContactFormModal onClose={onClose} />}
        </motion.div>
    );
};

export default MonitorTransition;

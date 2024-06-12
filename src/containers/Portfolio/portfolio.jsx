import React, { useState } from 'react';
import './portfolio.css';

const Portfolio = () => {
    const [selectedBubble, setSelectedBubble] = useState(null);

    const items = [
        { id: 1, title: "Project 1", description: "Description for project 1", imageUrl: "path/to/image1.jpg" },
        { id: 2, title: "Project 2", description: "Description for project 2", imageUrl: "path/to/image2.jpg" },
        // Add more items as needed
    ];

    const handleBubbleClick = (item) => {
        setSelectedBubble(item);
    };

    const handleClose = () => {
        setSelectedBubble(null);
    };

    return (
        <div className="portfolio">
            {items.map(item => (
                <div
                    key={item.id}
                    className={`bubble ${selectedBubble && selectedBubble.id === item.id ? 'expanded' : ''}`}
                    onClick={() => handleBubbleClick(item)}
                >
                    <img src={item.imageUrl} alt={item.title} />
                </div>
            ))}
            {selectedBubble && (
                <div className="info-panel active" onClick={handleClose}>
                    <div className="info-content">
                        <h2>{selectedBubble.title}</h2>
                        <p>{selectedBubble.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;

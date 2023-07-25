import React, { useEffect, useRef } from 'react';
import './Mouse.css';
import 'animate.css';

const Mouse = () => {
    const blobRef = useRef(null);

    useEffect(() => {
        const updateBlobPosition = (event) => {
            const blob = blobRef.current;
            if (!blob) return;

            const { clientX, clientY } = event;
            const blobRect = blob.getBoundingClientRect();

            // Calculate the scroll offsets
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;

            const left = clientX - blobRect.width / 2 + scrollX;
            const top = clientY - blobRect.height / 2 + scrollY;

            blob.animate(
                {
                    left: `${left}px`,
                    top: `${top}px`
                },
                {
                    duration: 3000,
                    fill: "forwards"
                }
            );
        };

        window.addEventListener('pointermove', updateBlobPosition);

        return () => {
            window.removeEventListener('pointermove', updateBlobPosition);
        };
    }, []);

    return (
        <>
            <div className="blur"></div>
            <div className="blob animate__slower" id="blob" ref={blobRef}></div>
        </>
    );
};

export default Mouse;

import React, { useEffect } from 'react';
import './Mouse.css';
import 'animate.css';

const Mouse = () => {
    useEffect(() => {
        const blob = document.getElementById("blob");
        const blobRect = blob.getBoundingClientRect();

        const updateBlobPosition = (event) => {
            const { clientX, clientY } = event;

            const left = clientX - blobRect.width / 2;
            const top = clientY - blobRect.height / 2;

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
            <div className="blob animate__slower" id="blob"></div>
        </>
    );
};

export default Mouse;

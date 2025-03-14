// src/components/cellularAutomata/CellularAutomata.jsx
import React, { useState, useEffect, useRef } from 'react';

const CELL_SIZE = 10;
const GRID_WIDTH = 50;
const GRID_HEIGHT = 30;
const UPDATE_INTERVAL = 300; // ms

function createRandomGrid() {
    const rows = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
        const row = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            row.push(Math.random() > 0.7 ? 1 : 0);
        }
        rows.push(row);
    }
    return rows;
}

// Create a grid that spells out a given text
// by drawing the text on an offscreen canvas, then reading pixel data.
function createGridFromText(text) {
    const rows = [];
    // We'll match the same dimension (GRID_WIDTH, GRID_HEIGHT)
    // but each cell is 1 pixel in the offscreen canvas to keep it simple
    // => We'll have an offscreen canvas of 50 x 30 pixels
    // You can scale up if needed.

    // Offscreen canvas
    const offCanvas = document.createElement('canvas');
    offCanvas.width = GRID_WIDTH;
    offCanvas.height = GRID_HEIGHT;
    const ctx = offCanvas.getContext('2d');

    // Fill background black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GRID_WIDTH, GRID_HEIGHT);

    // White text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px sans-serif'; // experiment with font size
    // We'll do a rough center
    ctx.fillText(text, 5, 20); // adjust so it's visible

    // Read pixel data
    const imageData = ctx.getImageData(0, 0, GRID_WIDTH, GRID_HEIGHT);
    const data = imageData.data; // RGBA array

    // Build rows from pixel data
    for (let y = 0; y < GRID_HEIGHT; y++) {
        const row = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            const index = (y * GRID_WIDTH + x) * 4;
            const r = data[index + 0];
            const g = data[index + 1];
            const b = data[index + 2];

            // If the pixel is bright => mark cell as alive
            const brightness = (r + g + b) / 3;
            if (brightness > 80) {
                row.push(1);
            } else {
                row.push(0);
            }
        }
        rows.push(row);
    }
    return rows;
}

const CellularAutomata = ({ hoveredText }) => {
    const canvasRef = useRef(null);
    const [grid, setGrid] = useState(createRandomGrid);
    const [isHovering, setIsHovering] = useState(false);

    // Basic GOL next-gen
    const getNextGeneration = (oldGrid) => {
        const newGrid = oldGrid.map((arr) => [...arr]);
        const directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [1, -1], [-1, 1], [-1, -1],
        ];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                let neighbors = 0;
                directions.forEach(([dx, dy]) => {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < GRID_WIDTH && ny >= 0 && ny < GRID_HEIGHT) {
                        neighbors += oldGrid[ny][nx];
                    }
                });
                const currentState = oldGrid[y][x];
                // Classic rules
                if (currentState === 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[y][x] = 0;
                } else if (currentState === 0 && neighbors === 3) {
                    newGrid[y][x] = 1;
                }
            }
        }
        return newGrid;
    };

    // If not hovering, run GOL on an interval
    useEffect(() => {
        // If we're not hovering, run the CA
        if (!isHovering) {
            const interval = setInterval(() => {
                setGrid((oldGrid) => getNextGeneration(oldGrid));
            }, UPDATE_INTERVAL);
            return () => clearInterval(interval);
        }
    }, [isHovering]);

    // If hoveredText changes, see if it's empty or not
    useEffect(() => {
        if (hoveredText) {
            // We have a hovered text, switch to text shape
            const textGrid = createGridFromText(hoveredText);
            setGrid(textGrid);
            setIsHovering(true);
        } else {
            // No hovered text, revert to normal CA
            // Option A: Keep the same grid and let it evolve
            // Option B: Re-randomize
            // Option C: Keep the text shape and let it start evolving from that

            // For a minimal approach, let’s just keep the shape but resume GOL:
            setIsHovering(false);
        }
    }, [hoveredText]);

    // Drawing the grid
    const drawGrid = (ctx, currentGrid) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (currentGrid[y][x] === 1) {
                    ctx.fillStyle = '#00ff00';
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    };

    // Draw on every grid change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        drawGrid(ctx, grid);
    }, [grid]);

    return (
        <canvas
            ref={canvasRef}
            width={GRID_WIDTH * CELL_SIZE}
            height={GRID_HEIGHT * CELL_SIZE}
            style={{
                border: '1px solid #ccc',
                display: 'block',
                margin: '1rem auto',
            }}
        />
    );
};

export default CellularAutomata;

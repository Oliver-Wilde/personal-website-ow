// src/components/cellularAutomata/CellularAutomata.jsx
import React, { useState, useEffect, useRef } from 'react';

// Example cell size and grid dimension
const CELL_SIZE = 10;
const GRID_WIDTH = 50;
const GRID_HEIGHT = 30;
const UPDATE_INTERVAL = 300; // ms per generation

// 1) Make `createRandomGrid` a function declaration *above* your component:
function createRandomGrid() {
    const rows = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
        const row = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            row.push(Math.random() > 0.7 ? 1 : 0); // ~30% alive
        }
        rows.push(row);
    }
    return rows;
}

const CellularAutomata = () => {
    const canvasRef = useRef(null);

    // 2) Initialize the grid in useState *with* createRandomGrid:
    const [grid, setGrid] = useState(() => createRandomGrid());

    // Compute the next generation (Game of Life rules, simplified)
    const getNextGeneration = (oldGrid) => {
        const newGrid = oldGrid.map((arr) => [...arr]); // clone

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
                // Classic GOL rules
                if (currentState === 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[y][x] = 0; // dies
                } else if (currentState === 0 && neighbors === 3) {
                    newGrid[y][x] = 1; // becomes alive
                }
            }
        }
        return newGrid;
    };

    // Render the grid onto canvas
    const drawGrid = (ctx, currentGrid) => {
        // Optional guard check:
        if (!currentGrid || !currentGrid.length) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (currentGrid[y][x] === 1) {
                    ctx.fillStyle = '#00ff00'; // alive = green
                    ctx.fillRect(
                        x * CELL_SIZE,
                        y * CELL_SIZE,
                        CELL_SIZE,
                        CELL_SIZE
                    );
                }
            }
        }
    };

    // 3) Remove the extra "setGrid(createRandomGrid())" effect. We already do that in useState.

    // Update the grid every UPDATE_INTERVAL
    useEffect(() => {
        const interval = setInterval(() => {
            setGrid((oldGrid) => getNextGeneration(oldGrid));
        }, UPDATE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    // Whenever grid changes, re-draw
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
            style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto' }}
        />
    );
};

export default CellularAutomata;

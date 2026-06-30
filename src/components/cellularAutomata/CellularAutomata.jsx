import React, { useEffect, useRef } from "react";

const DEFAULT_COLS = 120;
const DEFAULT_ROWS = 80;

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function easeInOutCubic(t) {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function createGrid(rows, cols, fill = 0) {
  const g = new Uint8Array(rows * cols);
  if (fill !== 0) g.fill(fill);
  return g;
}

function idx(r, c, cols) {
  return r * cols + c;
}

function countNeighbors(grid, r, c, rows, cols) {
  let n = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const rr = (r + dr + rows) % rows;
      const cc = (c + dc + cols) % cols;
      n += grid[idx(rr, cc, cols)] ? 1 : 0;
    }
  }
  return n;
}

function stepLife(curr, next, rows, cols) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = idx(r, c, cols);
      const alive = curr[i] === 1;
      const n = countNeighbors(curr, r, c, rows, cols);
      next[i] = alive ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
    }
  }
}

function buildTextMask(text, rows, cols) {
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext("2d");
  if (!ctx) return createGrid(rows, cols, 0);

  ctx.clearRect(0, 0, cols, rows);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cols, rows);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxSize = Math.floor(rows * 0.55);
  const fontSize = Math.max(
    10,
    Math.min(maxSize, Math.floor((cols / Math.max(6, text.length)) * 1.6))
  );

  // IMPORTANT: must be a string, built without template literals
  ctx.font = "700 " + fontSize + "px Arial Black, Impact, system-ui";

  ctx.fillText(text.toUpperCase(), Math.floor(cols / 2), Math.floor(rows / 2));

  const img = ctx.getImageData(0, 0, cols, rows).data;
  const mask = createGrid(rows, cols, 0);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const p = (r * cols + c) * 4;
      const lum = img[p] + img[p + 1] + img[p + 2];
      mask[idx(r, c, cols)] = lum > 80 ? 1 : 0;
    }
  }

  return mask;
}

export default function CellularAutomata(props) {
  const targetText = (props && props.targetText) ? props.targetText : "";
  const cols = (props && props.cols) ? props.cols : DEFAULT_COLS;
  const rows = (props && props.rows) ? props.rows : DEFAULT_ROWS;
  const attractStrength = (props && props.attractStrength != null) ? props.attractStrength : 0.55;
  const repelStrength = (props && props.repelStrength != null) ? props.repelStrength : 0.25;
  const seedDensity = (props && props.seedDensity != null) ? props.seedDensity : 0.18;

  const canvasRef = useRef(null);

  const stateRef = useRef({
    curr: createGrid(rows, cols, 0),
    next: createGrid(rows, cols, 0),
    mask: createGrid(rows, cols, 0),
    maskText: "",
    target: 0,
    value: 0,
    lastT: performance.now(),
  });

  useEffect(() => {
    const st = stateRef.current;
    st.curr = createGrid(rows, cols, 0);
    st.next = createGrid(rows, cols, 0);

    for (let i = 0; i < st.curr.length; i++) {
      st.curr[i] = Math.random() < seedDensity ? 1 : 0;
    }
  }, [rows, cols, seedDensity]);

  useEffect(() => {
    const st = stateRef.current;
    const text = (targetText || "").trim();

    st.target = text.length ? 1 : 0;

    if (text.length && text !== st.maskText) {
      st.mask = buildTextMask(text, rows, cols);
      st.maskText = text;
    }
  }, [targetText, rows, cols]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = cols;
    canvas.height = rows;

    const img = ctx.createImageData(cols, rows);

    let rafId = 0;
    const tick = (t) => {
      const st = stateRef.current;
      const dt = Math.min(0.05, (t - st.lastT) / 1000);
      st.lastT = t;

      const approach = 1 - Math.exp(-6 * dt);
      st.value = st.value + (st.target - st.value) * approach;
      const guide = easeInOutCubic(st.value);

      stepLife(st.curr, st.next, rows, cols);

      if (guide > 0.001 && st.maskText.length) {
        const birthP = attractStrength * guide;
        const killP = repelStrength * guide;

        for (let i = 0; i < st.next.length; i++) {
          const inMask = st.mask[i] === 1;
          if (inMask) {
            if (st.next[i] === 0 && Math.random() < birthP) st.next[i] = 1;
          } else {
            if (st.next[i] === 1 && Math.random() < killP) st.next[i] = 0;
          }
        }
      }

      const tmp = st.curr;
      st.curr = st.next;
      st.next = tmp;

      for (let i = 0; i < st.curr.length; i++) {
        const on = st.curr[i] === 1;
        const p = i * 4;
        img.data[p] = 255;
        img.data[p + 1] = 255;
        img.data[p + 2] = 255;
        img.data[p + 3] = on ? 230 : 0;
      }

      ctx.putImageData(img, 0, 0);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [cols, rows, attractStrength, repelStrength]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        imageRendering: "pixelated",
        borderRadius: "12px",
      }}
    />
  );
}
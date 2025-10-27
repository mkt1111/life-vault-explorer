import { useEffect, useRef } from "react";

interface GameGridProps {
  grid: boolean[][];
  onCellClick: (row: number, col: number) => void;
  cellSize: number;
}

export const GameGrid = ({ grid, onCellClick, cellSize }: GameGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "hsl(222 47% 11%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "hsl(215 28% 25%)";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= grid.length; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    for (let i = 0; i <= grid[0].length; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
    }

    // Draw cells
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          const x = colIndex * cellSize;
          const y = rowIndex * cellSize;

          // Create gradient for alive cells
          const gradient = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);
          gradient.addColorStop(0, "hsl(189 94% 53%)");
          gradient.addColorStop(1, "hsl(189 94% 63%)");

          ctx.fillStyle = gradient;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

          // Add glow effect
          ctx.shadowColor = "hsl(189 94% 63%)";
          ctx.shadowBlur = 8;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          ctx.shadowBlur = 0;
        }
      });
    });
  }, [grid, cellSize]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      onCellClick(row, col);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={grid[0].length * cellSize}
      height={grid.length * cellSize}
      onClick={handleCanvasClick}
      className="border border-border rounded-lg cursor-crosshair shadow-glow"
    />
  );
};

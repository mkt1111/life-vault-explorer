import { useState, useEffect, useCallback, useRef } from "react";
import { GameGrid } from "@/components/GameGrid";
import { Controls } from "@/components/Controls";
import { PatternLibrary } from "@/components/PatternLibrary";
import { InfoPanel } from "@/components/InfoPanel";
import { Pattern } from "@/data/patterns";
import { toast } from "sonner";

const GRID_ROWS = 60;
const GRID_COLS = 80;
const CELL_SIZE = 10;

const Index = () => {
  // Initialize with a glider pattern so users see something immediately
  const [grid, setGrid] = useState<boolean[][]>(() => {
    const initialGrid = Array(GRID_ROWS)
      .fill(null)
      .map(() => Array(GRID_COLS).fill(false));
    
    // Place glider in center
    const centerRow = Math.floor(GRID_ROWS / 2);
    const centerCol = Math.floor(GRID_COLS / 2);
    const gliderCells: [number, number][] = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    
    gliderCells.forEach(([row, col]) => {
      const newRow = centerRow + row - 5;
      const newCol = centerCol + col - 5;
      if (newRow >= 0 && newRow < GRID_ROWS && newCol >= 0 && newCol < GRID_COLS) {
        initialGrid[newRow][newCol] = true;
      }
    });
    
    return initialGrid;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [generation, setGeneration] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const intervalRef = useRef<number | null>(null);

  const countNeighbors = (grid: boolean[][], row: number, col: number): number => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < GRID_ROWS &&
          newCol >= 0 &&
          newCol < GRID_COLS &&
          grid[newRow][newCol]
        ) {
          count++;
        }
      }
    }
    return count;
  };

  const runSimulation = useCallback(() => {
    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const neighbors = countNeighbors(currentGrid, rowIndex, colIndex);
          if (cell) {
            return neighbors === 2 || neighbors === 3;
          } else {
            return neighbors === 3;
          }
        })
      );
      return newGrid;
    });
    setGeneration((gen) => gen + 1);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(runSimulation, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, runSimulation]);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell))
    );
    setGrid(newGrid);
  };

  const handlePlayPause = () => {
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    toast(newRunningState ? "Simulation running" : "Simulation paused");
  };

  const handleStep = () => {
    runSimulation();
    toast("Advanced one generation");
  };

  const handleClear = () => {
    setGrid(
      Array(GRID_ROWS)
        .fill(null)
        .map(() => Array(GRID_COLS).fill(false))
    );
    setGeneration(0);
    setIsRunning(false);
    toast("Grid cleared");
  };

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
  };

  const handleSelectPattern = (pattern: Pattern) => {
    setSelectedPattern(pattern);
    
    // Clear grid first
    const newGrid = Array(GRID_ROWS)
      .fill(null)
      .map(() => Array(GRID_COLS).fill(false));

    // Calculate center position
    const centerRow = Math.floor(GRID_ROWS / 2);
    const centerCol = Math.floor(GRID_COLS / 2);

    // Place pattern at center
    pattern.cells.forEach(([row, col]) => {
      const newRow = centerRow + row - 5;
      const newCol = centerCol + col - 5;
      if (newRow >= 0 && newRow < GRID_ROWS && newCol >= 0 && newCol < GRID_COLS) {
        newGrid[newRow][newCol] = true;
      }
    });

    setGrid(newGrid);
    setGeneration(0);
    // Keep the simulation running if it was already running
    toast(`Loaded ${pattern.name}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-6">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Conway's Game of Life
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore the fascinating world of cellular automata and emergent complexity
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-6">
          {/* Left Sidebar - Controls and Pattern Library */}
          <div className="flex flex-col gap-6">
            <Controls
              isRunning={isRunning}
              speed={speed}
              generation={generation}
              onPlayPause={handlePlayPause}
              onStep={handleStep}
              onClear={handleClear}
              onSpeedChange={handleSpeedChange}
            />
            <div className="lg:h-[600px]">
              <PatternLibrary
                onSelectPattern={handleSelectPattern}
                selectedPattern={selectedPattern}
              />
            </div>
          </div>

          {/* Center - Game Grid */}
          <div className="flex flex-col items-center gap-6">
            <GameGrid
              grid={grid}
              onCellClick={handleCellClick}
              cellSize={CELL_SIZE}
            />
            
            {/* Rules Section */}
            <div className="w-full max-w-[800px] p-6 bg-card rounded-lg border border-border">
              <h3 className="text-xl font-bold mb-4 text-primary">The Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">1.</span>
                  <div>
                    <span className="font-semibold text-foreground">Birth:</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      A dead cell with exactly 3 live neighbors becomes alive
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-primary font-bold text-lg">2.</span>
                  <div>
                    <span className="font-semibold text-foreground">Survival:</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      A live cell with 2 or 3 live neighbors stays alive
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-destructive font-bold text-lg">3.</span>
                  <div>
                    <span className="font-semibold text-foreground">Underpopulation:</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      A live cell with fewer than 2 neighbors dies
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-destructive font-bold text-lg">4.</span>
                  <div>
                    <span className="font-semibold text-foreground">Overpopulation:</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      A live cell with more than 3 neighbors dies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Info Panel */}
          <div className="lg:h-[800px]">
            <InfoPanel pattern={selectedPattern} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

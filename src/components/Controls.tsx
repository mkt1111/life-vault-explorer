import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

interface ControlsProps {
  isRunning: boolean;
  speed: number;
  generation: number;
  onPlayPause: () => void;
  onStep: () => void;
  onClear: () => void;
  onSpeedChange: (value: number[]) => void;
}

export const Controls = ({
  isRunning,
  speed,
  generation,
  onPlayPause,
  onStep,
  onClear,
  onSpeedChange,
}: ControlsProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-3">
        <Button
          onClick={onPlayPause}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Play
            </>
          )}
        </Button>
        <Button onClick={onStep} variant="outline" size="lg" disabled={isRunning}>
          <SkipForward className="mr-2 h-5 w-5" />
          Step
        </Button>
        <Button onClick={onClear} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-5 w-5" />
          Clear
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Speed</span>
          <span className="text-foreground font-mono">{speed} ms</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={onSpeedChange}
          min={50}
          max={1000}
          step={50}
          className="w-full"
        />
      </div>

      <div className="pt-2 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Generation</span>
          <span className="text-primary font-mono font-bold">{generation}</span>
        </div>
      </div>
    </div>
  );
};

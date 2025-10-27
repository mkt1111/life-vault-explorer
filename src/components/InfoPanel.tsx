import { Pattern, patternCategories } from "@/data/patterns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface InfoPanelProps {
  pattern: Pattern | null;
}

export const InfoPanel = ({ pattern }: InfoPanelProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border border-border h-full">
      <div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          {pattern ? pattern.name : "Conway's Game of Life"}
        </h2>
        {pattern && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="px-2 py-1 rounded text-xs font-semibold"
              style={{
                backgroundColor: patternCategories[pattern.category].color,
                color: "white",
              }}
            >
              {patternCategories[pattern.category].name}
            </span>
            {pattern.discoverer && (
              <span>• Discovered by {pattern.discoverer}</span>
            )}
            {pattern.year && <span>({pattern.year})</span>}
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 pr-4">
          {pattern ? (
            <>
              <div>
                <h3 className="font-semibold text-primary mb-2">Description</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {pattern.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-primary mb-2">Why It's Interesting</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {pattern.interestingFact}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Category: {patternCategories[pattern.category].name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {patternCategories[pattern.category].description}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-semibold text-primary mb-2">The Rules</h3>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  Conway's Game of Life is a cellular automaton devised by mathematician John Conway in 1970. Despite its simplicity, it can produce incredibly complex patterns.
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span><strong>Birth:</strong> A dead cell with exactly 3 live neighbors becomes alive</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span><strong>Survival:</strong> A live cell with 2 or 3 live neighbors stays alive</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span><strong>Death:</strong> A live cell with fewer than 2 neighbors dies (underpopulation)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span><strong>Death:</strong> A live cell with more than 3 neighbors dies (overpopulation)</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-primary mb-2">How to Use</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Click on the grid to toggle cells on/off</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Select a pattern from the library to load it</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use Play/Pause to watch the simulation evolve</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Adjust speed to see patterns in detail or fast-forward</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-primary mb-2">Fun Facts</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>The Game of Life is Turing complete - entire computers have been built within it!</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>The glider symbol has become an icon in hacker culture</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Despite simple rules, predicting long-term behavior is undecidable</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { patterns, patternCategories, Pattern } from "@/data/patterns";
import { useState, useEffect } from "react";

interface PatternLibraryProps {
  onSelectPattern: (pattern: Pattern) => void;
  selectedPattern: Pattern | null;
}

export const PatternLibrary = ({ onSelectPattern, selectedPattern }: PatternLibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPatterns = selectedCategory
    ? patterns.filter((p) => p.category === selectedCategory).sort((a, b) => a.name.localeCompare(b.name))
    : patterns.slice().sort((a, b) => a.name.localeCompare(b.name));

  // Auto-select first pattern when category changes
  useEffect(() => {
    if (filteredPatterns.length > 0) {
      onSelectPattern(filteredPatterns[0]);
    }
  }, [selectedCategory]);


  return (
    <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border border-border h-full">
      <div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Pattern Library
        </h2>
        <p className="text-sm text-muted-foreground">
          Click any pattern to load it onto the grid
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? "bg-gradient-primary" : ""}
        >
          All
        </Button>
        {Object.entries(patternCategories)
          .sort(([, a], [, b]) => a.name.localeCompare(b.name))
          .map(([key, category]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className={selectedCategory === key ? "bg-gradient-primary" : ""}
            >
              {category.name}
            </Button>
          ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-4">
          {filteredPatterns.map((pattern) => (
            <Button
              key={pattern.id}
              variant={selectedPattern?.id === pattern.id ? "default" : "outline"}
              className={`w-full justify-start text-left h-auto py-3 px-4 ${
                selectedPattern?.id === pattern.id ? "bg-gradient-primary" : ""
              }`}
              onClick={() => onSelectPattern(pattern)}
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="font-semibold">{pattern.name}</div>
                <div className="text-xs opacity-80 whitespace-normal break-words">
                  {pattern.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

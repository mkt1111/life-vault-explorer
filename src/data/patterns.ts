export interface Pattern {
  id: string;
  name: string;
  category: "still-life" | "oscillator" | "spaceship" | "methuselah" | "gun" | "other";
  cells: [number, number][];
  description: string;
  interestingFact: string;
  discoverer?: string;
  year?: number;
}

export const patterns: Pattern[] = [
  // Still Lifes
  {
    id: "block",
    name: "Block",
    category: "still-life",
    cells: [[0, 0], [0, 1], [1, 0], [1, 1]],
    description: "The simplest still life - a 2×2 square that never changes.",
    interestingFact: "The Block is the smallest and most common still life in Conway's Game of Life. It's stable because every live cell has exactly 2 or 3 neighbors.",
  },
  {
    id: "beehive",
    name: "Beehive",
    category: "still-life",
    cells: [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 2]],
    description: "A hexagonal still life resembling a beehive.",
    interestingFact: "One of the most common naturally-occurring still lifes, appearing frequently in random configurations.",
  },
  {
    id: "loaf",
    name: "Loaf",
    category: "still-life",
    cells: [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 3], [3, 2]],
    description: "A 7-cell still life shaped like a loaf of bread.",
    interestingFact: "The Loaf is the second most common still life after the Block.",
  },

  // Oscillators
  {
    id: "blinker",
    name: "Blinker",
    category: "oscillator",
    cells: [[1, 0], [1, 1], [1, 2]],
    description: "The simplest oscillator with period 2.",
    interestingFact: "The Blinker is the smallest and most common oscillator. It alternates between horizontal and vertical orientations every generation.",
    discoverer: "John Conway",
    year: 1970,
  },
  {
    id: "toad",
    name: "Toad",
    category: "oscillator",
    cells: [[1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2]],
    description: "A period-2 oscillator that looks like a toad hopping.",
    interestingFact: "The Toad expands and contracts in a rhythmic motion, appearing to 'breathe' as it oscillates.",
  },
  {
    id: "beacon",
    name: "Beacon",
    category: "oscillator",
    cells: [[0, 0], [0, 1], [1, 0], [2, 3], [3, 2], [3, 3]],
    description: "A period-2 oscillator made from two blocks.",
    interestingFact: "The Beacon appears as two blocks that alternatively touch and separate at their corners.",
  },
  {
    id: "pulsar",
    name: "Pulsar",
    category: "oscillator",
    cells: [
      [2, 4], [2, 5], [2, 6], [2, 10], [2, 11], [2, 12],
      [4, 2], [4, 7], [4, 9], [4, 14],
      [5, 2], [5, 7], [5, 9], [5, 14],
      [6, 2], [6, 7], [6, 9], [6, 14],
      [7, 4], [7, 5], [7, 6], [7, 10], [7, 11], [7, 12],
      [9, 4], [9, 5], [9, 6], [9, 10], [9, 11], [9, 12],
      [10, 2], [10, 7], [10, 9], [10, 14],
      [11, 2], [11, 7], [11, 9], [11, 14],
      [12, 2], [12, 7], [12, 9], [12, 14],
      [14, 4], [14, 5], [14, 6], [14, 10], [14, 11], [14, 12],
    ],
    description: "The most common period-3 oscillator, highly symmetric.",
    interestingFact: "The Pulsar is the most naturally occurring period-3 oscillator. Despite its complexity, it appears spontaneously more often than simpler period-3 oscillators.",
    discoverer: "John Conway",
    year: 1970,
  },

  // Spaceships
  {
    id: "glider",
    name: "Glider",
    category: "spaceship",
    cells: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
    description: "The smallest and most common spaceship, moves diagonally.",
    interestingFact: "The Glider is perhaps the most famous pattern in the Game of Life. It travels one cell diagonally every 4 generations and is used as a symbol for hacker culture. The Glider is the basis for many constructions, including computers built within the Game of Life!",
    discoverer: "Richard K. Guy",
    year: 1970,
  },
  {
    id: "lwss",
    name: "Lightweight Spaceship (LWSS)",
    category: "spaceship",
    cells: [[0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3]],
    description: "The smallest orthogonal spaceship, travels horizontally.",
    interestingFact: "The LWSS moves at a speed of c/2 (one cell every two generations), which is the fastest speed possible for orthogonal spaceships in Conway's Game of Life.",
    discoverer: "John Conway",
    year: 1970,
  },

  // Methuselahs
  {
    id: "r-pentomino",
    name: "R-pentomino",
    category: "methuselah",
    cells: [[0, 1], [0, 2], [1, 0], [1, 1], [2, 1]],
    description: "A small pattern that stabilizes after 1103 generations.",
    interestingFact: "The R-pentomino is one of the most active polyominoes, despite having only 5 cells. Conway originally studied it believing it might grow indefinitely, but it stabilizes after 1103 generations into a complex pattern with multiple gliders, blocks, and other objects. It's the most common methuselah discovered in random soups.",
    discoverer: "John Conway",
    year: 1970,
  },
  {
    id: "diehard",
    name: "Diehard",
    category: "methuselah",
    cells: [[0, 6], [1, 0], [1, 1], [2, 1], [2, 5], [2, 6], [2, 7]],
    description: "A pattern that vanishes completely after 130 generations.",
    interestingFact: "Despite its name suggesting longevity, Diehard completely disappears after exactly 130 generations - one of the few patterns that vanishes entirely rather than stabilizing.",
    discoverer: "Bill Gosper",
    year: 1970,
  },
  {
    id: "acorn",
    name: "Acorn",
    category: "methuselah",
    cells: [[0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]],
    description: "Takes 5206 generations to stabilize from just 7 cells.",
    interestingFact: "The Acorn is remarkable for its efficiency: only 7 cells create a complex pattern that takes 5206 generations to stabilize, producing 633 cells including 13 escaped gliders. It holds the record for the longest-lived 7-cell methuselah.",
    discoverer: "Charles Corderman",
    year: 1970,
  },

  // Guns
  {
    id: "gosper-glider-gun",
    name: "Gosper Glider Gun",
    category: "gun",
    cells: [
      [0, 24],
      [1, 22], [1, 24],
      [2, 12], [2, 13], [2, 20], [2, 21], [2, 34], [2, 35],
      [3, 11], [3, 15], [3, 20], [3, 21], [3, 34], [3, 35],
      [4, 0], [4, 1], [4, 10], [4, 16], [4, 20], [4, 21],
      [5, 0], [5, 1], [5, 10], [5, 14], [5, 16], [5, 17], [5, 22], [5, 24],
      [6, 10], [6, 16], [6, 24],
      [7, 11], [7, 15],
      [8, 12], [8, 13],
    ],
    description: "The first gun discovered - creates gliders indefinitely.",
    interestingFact: "The Gosper Glider Gun was the first known finite pattern that grows indefinitely. Its discovery in 1970 won Bill Gosper a $50 prize from John Conway, who had conjectured that no such pattern existed. This pattern proved that the Game of Life is Turing complete, meaning it can simulate any computer algorithm.",
    discoverer: "Bill Gosper",
    year: 1970,
  },

  // Other
  {
    id: "custom",
    name: "Custom",
    category: "other",
    cells: [],
    description: "Create your own pattern by clicking cells on the grid.",
    interestingFact: "Start with a blank canvas and design your own patterns! Try creating symmetrical shapes, or just experiment to see what interesting behaviors emerge. Some of the most fascinating patterns in the Game of Life were discovered through experimentation.",
  },
];

export const patternCategories = {
  "still-life": {
    name: "Still Lifes",
    description: "Patterns that never change once formed.",
    color: "hsl(189 94% 43%)",
  },
  "oscillator": {
    name: "Oscillators",
    description: "Patterns that repeat in a cycle.",
    color: "hsl(271 81% 56%)",
  },
  "spaceship": {
    name: "Spaceships",
    description: "Patterns that translate themselves across the grid.",
    color: "hsl(142 76% 36%)",
  },
  "methuselah": {
    name: "Methuselahs",
    description: "Small patterns that take many generations to stabilize.",
    color: "hsl(24 95% 53%)",
  },
  "gun": {
    name: "Guns",
    description: "Patterns that create other patterns indefinitely.",
    color: "hsl(340 82% 52%)",
  },
  "other": {
    name: "Other",
    description: "Miscellaneous interesting patterns.",
    color: "hsl(45 93% 47%)",
  },
};

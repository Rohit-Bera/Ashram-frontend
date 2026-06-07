// Highly accurate simplified polygonal geographic datasets for rendering the Earth
export interface GeographicPolygon {
  name: string;
  coordinates: [number, number][]; // [longitude, latitude] in degrees
  color: string; // Base geographic color (e.g. green forest, icy snow)
  terrainColor: string; // Central terrain overlay (e.g. mountain brown, desert sand)
}

export const WORLD_LANDMASS_POLYGONS: GeographicPolygon[] = [
  {
    name: "Eurasia",
    coordinates: [
      [-9, 39], [0, 44], [-2, 48], [5, 48], [10, 54], [10, 58], [15, 62], [22, 65],  [30, 68], [40, 70],
      [60, 72], [80, 74], [105, 77], [130, 75], [150, 74], [165, 72], [178, 67], [170, 60], [160, 52],
      [141, 43], [142, 35], [128, 36], [121, 31], [115, 22], [108, 16], [102, 5], [100, 1], [98, 5],
      [95, 12], [88, 22], [79, 9], [76, 12], [72, 19], [68, 23], [60, 25], [55, 24], [48, 12], [43, 12],
      [34, 28], [27, 34], [16, 38], [9, 37], [-5, 36], [-9, 39]
    ],
    color: "#2e7d32", // Lush forest green
    terrainColor: "#8d6e63" // Siennd brown
  },
  {
    name: "India (Sacred Peninsula Detail)",
    coordinates: [
      [68, 23], [70, 21], [72.8, 19], [73, 15], [76, 10], [77.5, 8], [79, 10], [80.2, 13], [81.5, 16],
      [83.2, 18], [85, 20], [88, 22], [74, 25], [68, 23]
    ],
    color: "#1b5e20", // Deep spiritual emerald green
    terrainColor: "#fbc02d" // Warm sienna / gangetic soil gold
  },
  {
    name: "Africa",
    coordinates: [
      [-17, 15], [-16, 25], [-10, 31], [0, 36], [10, 36], [22, 32], [30, 31], [33, 30], [34, 27],
      [43, 12], [51, 11], [46, 5], [40, -4], [40, -15], [36, -24], [32, -33], [20, -34], [15, -30],
      [11, -14], [9, 0], [4, 5], [-4, 5], [-8, 4], [-13, 10], [-17, 15]
    ],
    color: "#388e3c", // Forest green
    terrainColor: "#ffe082" // Golden Sahara desert sands
  },
  {
    name: "North America",
    coordinates: [
      [-168, 65], [-150, 70], [-130, 70], [-120, 70], [-95, 74], [-80, 75], [-60, 60], [-55, 50],
      [-63, 44], [-70, 45], [-75, 35], [-80, 25], [-81, 24], [-85, 20], [-80, 9], [-90, 15],
      [-96, 16], [-105, 20], [-115, 30], [-120, 34], [-124, 42], [-130, 50], [-145, 60], [-160, 60], [-168, 65]
    ],
    color: "#3c763d", // Mountain pine green
    terrainColor: "#a1887f" // Rocky mountains rocky dust
  },
  {
    name: "South America",
    coordinates: [
      [-80, 9], [-75, 12], [-70, 11], [-60, 10], [-50, -2], [-40, -4], [-35, -5], [-40, -20],
      [-45, -30], [-60, -40], [-65, -50], [-71, -55], [-75, -50], [-72, -40], [-71, -30], [-75, -20],
      [-80, -15], [-81, -5], [-80, 5], [-80, 9]
    ],
    color: "#1b5e20", // Deep Amazonian jungle green
    terrainColor: "#8d6e63" // Andes mountain range brown
  },
  {
    name: "Australia",
    coordinates: [
      [113, -25], [115, -32], [120, -34], [130, -32], [138, -35], [146, -39], [150, -34], [153, -28],
      [145, -15], [142, -11], [136, -11], [130, -12], [122, -16], [118, -20], [113, -25]
    ],
    color: "#4caf50", // Coastal green
    terrainColor: "#ff8a65" // Red outback central desert
  },
  {
    name: "Greenland",
    coordinates: [
      [-60, 60], [-55, 75], [-40, 83], [-15, 80], [-20, 70], [-40, 60], [-60, 60]
    ],
    color: "#f8fafc", // Clear white glacier snow
    terrainColor: "#e2e8f0" // Deep icy valley slate blue
  },
  {
    name: "Antarctica",
    coordinates: [
      [-180, -75], [-150, -76], [-120, -78], [-90, -77], [-60, -75], [-30, -74], [0, -73],
      [30, -74], [60, -75], [90, -76], [120, -78], [150, -77], [180, -75]
    ],
    color: "#ffffff", // Pure polar glacier ice caps
    terrainColor: "#eceff1" // Ice-blue contours
  }
];

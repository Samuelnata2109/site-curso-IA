export type Label = "circle" | "triangle";
export type Features = { roundness: number; vertices: number; color: number };
export type Sample = { features: Features; label: Label };
export type ShapeExample = { id: string; truth: Label; features: Features };

// Only measured features and player labels enter prediction. Truth is used for scoring.
export function classify(samples: Sample[], object: Features): Label | null {
  if (!samples.length) return null;
  const neighbors = samples
    .map((sample) => ({
      label: sample.label,
      distance: Math.hypot(
        (sample.features.roundness - object.roundness) * 2.4,
        (sample.features.vertices - object.vertices) * 2.8,
        (sample.features.color - object.color) * 0.15,
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);
  const votes = { circle: 0, triangle: 0 };
  for (const neighbor of neighbors)
    votes[neighbor.label] += 1 / Math.max(neighbor.distance, 0.001);
  return votes.circle >= votes.triangle ? "circle" : "triangle";
}

export const trainingObjects: ShapeExample[] = [
  {
    id: "train-1",
    truth: "circle",
    features: { roundness: 0.98, vertices: 0, color: 0 },
  },
  {
    id: "train-2",
    truth: "triangle",
    features: { roundness: 0.23, vertices: 1, color: 1 },
  },
  {
    id: "train-3",
    truth: "circle",
    features: { roundness: 0.9, vertices: 0, color: 1 },
  },
  {
    id: "train-4",
    truth: "triangle",
    features: { roundness: 0.31, vertices: 1, color: 0 },
  },
  {
    id: "train-5",
    truth: "circle",
    features: { roundness: 0.94, vertices: 0.05, color: 0 },
  },
  {
    id: "train-6",
    truth: "triangle",
    features: { roundness: 0.27, vertices: 0.95, color: 1 },
  },
  {
    id: "train-7",
    truth: "circle",
    features: { roundness: 0.87, vertices: 0.05, color: 1 },
  },
  {
    id: "train-8",
    truth: "triangle",
    features: { roundness: 0.35, vertices: 0.9, color: 0 },
  },
];
export const testObjects: ShapeExample[] = [
  {
    id: "test-1",
    truth: "circle",
    features: { roundness: 0.92, vertices: 0.03, color: 1 },
  },
  {
    id: "test-2",
    truth: "triangle",
    features: { roundness: 0.29, vertices: 0.97, color: 0 },
  },
  {
    id: "test-3",
    truth: "circle",
    features: { roundness: 0.96, vertices: 0.02, color: 0 },
  },
  {
    id: "test-4",
    truth: "triangle",
    features: { roundness: 0.33, vertices: 0.92, color: 1 },
  },
];
export const labelName = (label: Label) =>
  label === "circle" ? "Círculo" : "Triângulo";

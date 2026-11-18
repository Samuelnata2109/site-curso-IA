import type { Sample } from "./learning";
export type Progress = { version: 1; scores: number[]; samples: Sample[] };
const key = "guiomar-teach-robot-v1";
export const emptyProgress = (): Progress => ({
  version: 1,
  scores: [],
  samples: [],
});
export function loadProgress(): Progress {
  try {
    const data = JSON.parse(localStorage.getItem(key) ?? "null");
    if (
      data?.version !== 1 ||
      !Array.isArray(data.scores) ||
      data.scores.length > 6 ||
      !data.scores.every(
        (n: unknown) =>
          typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 100,
      )
    )
      return emptyProgress();
    if (
      !Array.isArray(data.samples) ||
      data.samples.length !== 8 ||
      !data.samples.every(
        (s: Sample) =>
          s &&
          (s.label === "circle" || s.label === "triangle") &&
          s.features &&
          [s.features.roundness, s.features.vertices, s.features.color].every(
            (n) =>
              typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 1,
          ),
      )
    )
      return emptyProgress();
    return data;
  } catch {
    return emptyProgress();
  }
}
export function saveProgress(progress: Progress): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export type Cell = readonly [number, number];
export const maze = [
  [0, 0, 1, 0, 0],
  [1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
];
export const start: Cell = [0, 0];
export const goal: Cell = [4, 4];
export const directions = [
  { name: "Frente", key: "ArrowUp", delta: [-1, 0] as Cell },
  { name: "Trás", key: "ArrowDown", delta: [1, 0] as Cell },
  { name: "Esquerda", key: "ArrowLeft", delta: [0, -1] as Cell },
  { name: "Direita", key: "ArrowRight", delta: [0, 1] as Cell },
];
export const sameCell = (a: Cell, b: Cell) => a[0] === b[0] && a[1] === b[1];
export const walkable = ([row, column]: Cell) => maze[row]?.[column] === 0;
export function moveCell(cell: Cell, delta: Cell): Cell {
  const next: Cell = [cell[0] + delta[0], cell[1] + delta[1]];
  return walkable(next) ? next : cell;
}
export function findPath(from: Cell, to: Cell): Cell[] {
  if (!walkable(from) || !walkable(to)) return [];
  const queue: Cell[][] = [[from]];
  const visited = new Set([from.join(",")]);
  for (let i = 0; i < queue.length; i++) {
    const path = queue[i],
      last = path[path.length - 1];
    if (sameCell(last, to)) return path;
    for (const { delta } of directions) {
      const next = moveCell(last, delta),
        key = next.join(",");
      if (!visited.has(key)) {
        visited.add(key);
        queue.push([...path, next]);
      }
    }
  }
  return [];
}

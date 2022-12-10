import { readFile } from "fs/promises";

type Dir = "U" | "R" | "L" | "D";
type Coords = `${number},${number}`;
const coords = (x: number, y: number): Coords => `${x},${y}`;
const move = (pos: Coords, dir: Dir) => {
  const [x, y] = pos.split(",").map(Number);
  if (dir === "U") return coords(x, y + 1);
  if (dir === "R") return coords(x + 1, y);
  if (dir === "L") return coords(x - 1, y);
  if (dir === "D") return coords(x, y - 1);
  // unreachable
  return coords(x, y);
};

function follow(tail: Coords, head: Coords): Coords {
  const [tailX, tailY] = tail.split(",").map(Number);
  const [headX, headY] = head.split(",").map(Number);
  // if tail is next to, diagonal to, or on top of head, return tail
  if (Math.abs(tailX - headX) <= 1 && Math.abs(tailY - headY) <= 1) return tail;
  // otherwise, move towards head (can be diagonal)
  const xChange = Math.sign(headX - tailX);
  const yChange = Math.sign(headY - tailY);
  return coords(tailX + xChange, tailY + yChange);
}

const part1 = (input: string) => {
  const moves = input.split("\n").map((line) => {
    const [dir, amt] = line.split(" ");
    return [dir, Number(amt)] as readonly [Dir, number];
  });
  const tailTrail: Coords[] = [`0,0`];
  let headPos: Coords = `0,0`;
  for (const [dir, amt] of moves) {
    for (let i = 0; i < amt; i++) {
      headPos = move(headPos, dir);
      tailTrail.push(follow(tailTrail.at(-1)!, headPos));
    }
  }
  return new Set(tailTrail).size;
};

const part2 = (input: string) => {
  const moves = input.split("\n").map((line) => {
    const [dir, amt] = line.split(" ");
    return [dir, Number(amt)] as readonly [Dir, number];
  });
  const tailTrail: Coords[] = [`0,0`];
  const positions: Coords[] = new Array(10).fill(`0,0`);
  for (const [dir, amt] of moves) {
    for (let i = 0; i < amt; i++) {
      positions[0] = move(positions[0], dir);
      for (let j = 1; j < positions.length; j++) {
        positions[j] = follow(positions[j], positions[j - 1]);
      }
      tailTrail.push(positions.at(-1)!);
    }
  }
  return new Set(tailTrail).size;
};
// const input = Promise.resolve(`R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`);
const input = readFile(new URL("./input.txt", import.meta.url), "utf8");
input.then(part2).then(console.log);

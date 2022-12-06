/**
 * Day 5: Supply Stacks
 * https://adventofcode.com/2022/day/5
 */

import { readFile } from "fs/promises";
import { transpose } from "../utils/transpose";

const parse = (input: string) => {
  const [cratesStr, stepsStr] = input.split("\n\n");
  const rows = cratesStr
    .split("\n")
    .slice(0, -1)
    .map((line) => [...line.matchAll(/\[([A-Z])\]|    ?/g)].map((m) => m[1]));
  const stacks = transpose(rows).map((col) => col.filter(Boolean));
  const steps = stepsStr
    .split("\n")
    .map((line) => line.match(/move (\d+) from (\d+) to (\d+)/)!.slice(1, 4));
  return { stacks, steps };
};

const part1 = (input: string) => {
  const { stacks, steps } = parse(input);

  for (const step of steps) {
    const [quant, from, to] = step.map(Number);
    const crates = stacks[from - 1].splice(-quant).reverse();
    stacks[to - 1].push(...crates);
  }
  return stacks.map((stack) => stack.at(-1)).join("");
};
const part2 = (input: string) => {
  const { stacks, steps } = parse(input);

  for (const step of steps) {
    const [quant, from, to] = step.map(Number);
    // took 5 characters to change lmao
    const crates = stacks[from - 1].splice(-quant);
    stacks[to - 1].push(...crates);
  }
  return stacks.map((stack) => stack.at(-1)).join("");
};

const input = readFile(new URL("./input.txt", import.meta.url), "utf8");

input.then((text) => {
  console.log(part1(text));
});

// const input = `    [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2`;
// console.log(part1(input));

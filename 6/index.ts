/**
 * Day 6: Tuning Trouble
 * https://adventofcode.com/2022/day/6
 */

import { readFile } from "fs/promises";

const indexOfDistinct = (str: string, length: number) => {
  for (let i = length; i < str.length; i++) {
    const prev = str.slice(i - length, i);
    if (new Set(prev).size === length) return i;
  }
};

const part1 = (input: string) => indexOfDistinct(input, 4);
const part2 = (input: string) => indexOfDistinct(input, 14);

const input = readFile(new URL("./input.txt", import.meta.url), "utf8");

input.then((text) => {
  console.log(part2(text));
});

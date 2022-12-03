/**
 * Day 3: Rucksack Reorganization
 * https://adventofcode.com/2022/day/3
 */

import { readFile } from "fs/promises";
import { chunk } from "../utils/chunk.js";
import { sum } from "../utils/sum.js";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Get the sacks, divide each sack in half, find the common letter of
 * the two halves, and return the sum of the priorities.
 */
const part1 = (input: string) => {
  const sacks = input.split("\n");
  const compartments = sacks.map((sack) => [
    sack.slice(0, sack.length / 2),
    sack.slice(sack.length / 2),
  ]);
  const wrongItems = compartments
    .map(([a, b]) => b.split("").find((item) => a.includes(item)))
    .filter((item) => item !== undefined) as string[];
  const priorities = wrongItems.map((item) => alphabet.indexOf(item) + 1);
  return sum(priorities);
};

/**
 * Get the sacks, group them into triplets, find the common letter of
 * all three sacks, and return the sum of the priorities.
 */
const part2 = (input: string) => {
  const sacks = input.split("\n");
  const groups = chunk(sacks, 3);
  const badges = groups
    .map(([a, b, c]) =>
      a.split("").find((item) => b.includes(item) && c.includes(item))
    )
    .filter((item) => item !== undefined) as string[];
  const priorities = badges.map((item) => alphabet.indexOf(item) + 1);
  return sum(priorities);
};

const input = readFile(new URL("./input.txt", import.meta.url), "utf8");

input.then((text) => {
  console.log(part2(text));
});

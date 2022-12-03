/**
 * Day 1: Calorie Counting
 * https://adventofcode.com/2022/day/1
 */

import { readFile } from "fs/promises";
import { sum } from "../utils/sum.js";

const parseGroups = (str: string) =>
  str.split("\n\n").map((group) => group.split("\n").map(Number));

/**
 * Get the grouped numbers, sum each group, and return the maximum sum.
 */
const part1 = (str: string) => {
  const groups = parseGroups(str);
  const summed = groups.map(sum);
  return Math.max(...summed);
};
/**
 * Get the grouped numbers, sum each group, get the 3 highest numbers,
 * and return the sum.
 */
const part2 = (str: string) => {
  const groups = parseGroups(str);
  const summed = groups.map(sum);
  const top3 = summed.sort((a, b) => b - a).slice(0, 3);
  return sum(top3);
};

const input = readFile(new URL("./input.txt", import.meta.url), "utf8");

input.then((text) => {
  console.log(part2(text));
});

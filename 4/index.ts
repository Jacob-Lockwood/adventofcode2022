/**
 * Day 4: Camp Cleanup
 * https://adventofcode.com/2022/day/4
 */

import { readFile } from "fs/promises";
import { count } from "../utils/count";
import { completelyOverlaps, someOverlap } from "../utils/overlap";
import { rangeArr } from "../utils/rangeArr";

/**
 * Get the pairs, convert each range to an array, and count how
 * many pairs completely overlap
 */
const part1 = (input: string) => {
  const pairs = input.split("\n").map((line) => line.split(","));
  return count(pairs, (pair) => {
    const [a, b] = pair
      .map((range) => range.split("-"))
      .map((range) => rangeArr(Number(range[0]), Number(range[1])));
    return completelyOverlaps(a, b);
  });
};

/**
 * Get the pairs, convert each range to an array, and count how
 * many pairs have any overlap
 */
const part2 = (input: string) => {
  const pairs = input.split("\n").map((line) => line.split(","));
  return count(pairs, (pair) => {
    const [a, b] = pair
      .map((range) => range.split("-"))
      .map((range) => rangeArr(Number(range[0]), Number(range[1])));
    return someOverlap(a, b);
  });
};

const input = readFile(new URL("./input.txt", import.meta.url), "utf8");

input.then((text) => {
  console.log(part2(text));
});

// const input = `2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8`;
// console.log(part1(input));

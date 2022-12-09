/**
 * Day 8: Treetop Tree House
 */

import { readFile } from "fs/promises";
import { count } from "../utils/count.js";
import { sum } from "../utils/sum.js";

const isVisible = (x: number, y: number, map: number[][]) => {
  const row = map[y];
  const column = map.map((row) => row[x]);
  const height = row[x];
  const isVisibleFromLeft = !row.slice(0, x).some((value) => value >= height);
  const isVisibleFromRight = !row.slice(x + 1).some((value) => value >= height);
  const isVisibleFromTop = !column.slice(0, y).some((value) => value >= height);
  const isVisibleFromBottom = !column
    .slice(y + 1)
    .some((value) => value >= height);
  return (
    isVisibleFromTop ||
    isVisibleFromBottom ||
    isVisibleFromLeft ||
    isVisibleFromRight
  );
};

const getScenicScore = (x: number, y: number, map: number[][]) => {
  const row = map[y];
  const column = map.map((row) => row[x]);
  const height = row[x];
  const scenicScoreCb = (
    [score, highest]: [number, number],
    curr: number
  ): [number, number] => {
    if (isNaN(highest)) return [score, highest];
    if (highest > curr) {
      return [score + 1, highest];
    }
    return [score + 1, NaN];
  };
  const [scenicScoreLeft] = row
    .slice(0, x)
    .reduceRight<[number, number]>(scenicScoreCb, [0, height]);
  const [scenicScoreRight] = row
    .slice(x + 1)
    .reduce<[number, number]>(scenicScoreCb, [0, height]);
  const [scenicScoreTop] = column
    .slice(0, y)
    .reduceRight<[number, number]>(scenicScoreCb, [0, height]);
  const [scenicScoreBottom] = column
    .slice(y + 1)
    .reduce<[number, number]>(scenicScoreCb, [0, height]);
  return (
    scenicScoreLeft * scenicScoreRight * scenicScoreTop * scenicScoreBottom
  );
};
const parseMap = (input: string) =>
  input.split("\n").map((line) => line.split("").map(Number));

const part1 = (input: string) => {
  const map = parseMap(input);
  return sum(map.map((row, y) => count(row, (_, x) => isVisible(x, y, map))));
};
const part2 = (input: string) => {
  const map = parseMap(input);
  return Math.max(
    ...map.flatMap((row, y) => row.flatMap((_, x) => getScenicScore(x, y, map)))
  );
};

// const input = Promise.resolve(`30373
// 25512
// 65332
// 33549
// 35390`);
const input = readFile(new URL("./input.txt", import.meta.url), "utf-8");
input.then(part2).then(console.log);

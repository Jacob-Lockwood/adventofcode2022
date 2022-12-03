/**
 * Day 2: Rock Paper Scissors
 * https://adventofcode.com/2022/day/2
 */

import { readFile } from "fs/promises";
import { sum } from "../utils/sum.js";

const scoreMap = { rock: 1, paper: 2, scissors: 3 } as const;
const moveMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
} as const;
type Cols = ["A" | "B" | "C", "X" | "Y" | "Z"];
type Move = "rock" | "paper" | "scissors";

const chooseMove = (move: Move, needed: "X" | "Y" | "Z") => {
  // draw
  if (needed === "Y") return move;
  // win
  if (needed === "Z") {
    if (move === "rock") return "paper";
    if (move === "paper") return "scissors";
    if (move === "scissors") return "rock";
  }
  // lose
  if (needed === "X") {
    if (move === "rock") return "scissors";
    if (move === "paper") return "rock";
    if (move === "scissors") return "paper";
  }
  // unreachable
  return move;
};

const determineScore = (opp: Move, you: Move) => {
  const score = scoreMap[you];
  // tie
  if (opp === you) return score + 3;
  // lose
  if (opp === "rock" && you === "scissors") return score + 0;
  if (opp === "paper" && you === "rock") return score + 0;
  if (opp === "scissors" && you === "paper") return score + 0;
  // win
  if (you === "rock" && opp === "scissors") return score + 6;
  if (you === "paper" && opp === "rock") return score + 6;
  if (you === "scissors" && opp === "paper") return score + 6;
  // unreachable
  return 0;
};

/**
 * Parse the guide, interpret the moves, and return the sum of the scores.
 */
const part1 = (input: string) => {
  const turns = input.split("\n").map((str) => str.split(" ") as Cols);
  const scores = turns.map(([opp, you]) => {
    const oppMove = moveMap[opp];
    const yourMove = moveMap[you];
    return determineScore(oppMove, yourMove);
  });
  return sum(scores);
};

/**
 * Parse the guide, determine the correct move, and return the sum of the scores.
 */
const part2 = (input: string) => {
  const turns = input.split("\n").map((str) => str.split(" ") as Cols);
  const scores = turns.map(([opp, needed]) => {
    const oppMove = moveMap[opp];
    const yourMove = chooseMove(moveMap[opp], needed);
    return determineScore(oppMove, yourMove);
  });
  return sum(scores);
};

const input = readFile(new URL("./input.txt", import.meta.url), "utf8");

input.then((text) => {
  console.log(part2(text));
});

/**
 * Day 7: No Space Left On Device
 * https://adventofcode.com/2022/day/7
 */

import { resolve } from "path";

type Folder = { [name: string]: number | Folder };

const part1 = (input: string) => {
  let currentDirectory: string = "/";
  const filesystem: Folder = {};
  for (const line of input.split("\n")) {
    if (line.startsWith("$ cd ")) {
      for (const dir of resolve(currentDirectory, line.slice(5)).split("/")) {
        filesystem[dir] = filesystem[dir] || {};
      }
    } else if (line === "$ ls") {
      console.log(currentDirectory);
    }
  }
};

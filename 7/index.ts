/**
 * Day 7: No Space Left On Device
 * https://adventofcode.com/2022/day/7
 */

import { readFile } from "fs/promises";
import { sum } from "../utils/sum.js";

type Folder = { [name: string]: number | Folder };

const pathInObject = (path: string, obj: Folder): Folder => {
  const [current, ...rest] = path.split("/");
  obj[current] ||= {};
  if (rest.length === 0) {
    return obj[current] as Folder;
  }
  return pathInObject(rest.join("/"), obj[current] as Folder);
};

const sizeOfFolder = (folder: Folder): number => {
  let size = 0;
  for (const [name, value] of Object.entries(folder)) {
    if (typeof value === "number") {
      size += value;
    } else {
      size += sizeOfFolder(value);
    }
  }
  return size;
};

const allFoldersUnderSize = (size: number, folder: Folder): Folder[] => {
  const folders: Folder[] = [];
  for (const val of Object.values(folder)) {
    if (typeof val === "number") continue;
    const folderSize = sizeOfFolder(val);
    if (folderSize < size) folders.push(val);
    folders.push(...allFoldersUnderSize(size, val));
  }
  return folders;
};
const allFoldersAboveSize = (size: number, folder: Folder): Folder[] => {
  const folders: Folder[] = [];
  for (const val of Object.values(folder)) {
    if (typeof val === "number") continue;
    const folderSize = sizeOfFolder(val);
    if (folderSize > size) folders.push(val);
    folders.push(...allFoldersAboveSize(size, val));
  }
  return folders;
};

const parseInput = (input: string) => {
  let currentDirectory: string = "/";
  const filesystem: Folder = {};
  for (const line of input.split("\n")) {
    if (line.startsWith("$ cd ")) {
      const path = line.slice(5);
      if (path === "..") {
        currentDirectory = currentDirectory.slice(
          0,
          currentDirectory.lastIndexOf("/")
        );
      } else if (path.startsWith("/")) {
        currentDirectory = path;
      } else currentDirectory += `/${path}`;
    } else if (line !== "$ ls") {
      const folder = pathInObject(currentDirectory, filesystem);
      filesystem[currentDirectory] ||= {};
      if (line.startsWith("dir ")) {
        folder[line.slice(4)] = {};
      } else {
        const [size, name] = line.split(" ");
        folder[name] = Number(size);
      }
    }
  }
  return filesystem;
};

const part1 = (input: string) => {
  const filesystem = parseInput(input);
  return sum(allFoldersUnderSize(100000, filesystem).map(sizeOfFolder));
};

const part2 = (input: string) => {
  const filesystem = parseInput(input);
  const unusedSpace = 70000000 - sizeOfFolder(filesystem);
  const neededSpace = 30000000 - unusedSpace;
  // find the smallest folder that is bigger than neededSpace
  const smallestFolder = allFoldersAboveSize(neededSpace, filesystem).sort(
    (a, b) => sizeOfFolder(a) - sizeOfFolder(b)
  )[0];
  return sizeOfFolder(smallestFolder);
};

// const input = Promise.resolve(`$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`);
const input = readFile(new URL("./input.txt", import.meta.url), "utf-8");
input.then(part2).then(console.log);

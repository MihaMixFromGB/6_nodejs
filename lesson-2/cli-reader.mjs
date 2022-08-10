#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

program
  .description('CLI to some utilities')
  .option('-f, --files', 'list of files for the current directory')
  .option('-fd, --filesInDirectory <string>', 'list of files for the set directory')
  .option('-e, --explorer', 'start File Explorer')
  .option('-p, --pattern <string>', "regex pattern to filter file's content")
  
program.parse();

const options = program.opts();

const currentDirectory = process.cwd();

const isFile = (file, currentDirectory) => {
  if (!currentDirectory) {
    currentDirectory = program.cwd();
  }
  const fullPath = path.join(currentDirectory, file);

  return fs.lstatSync(fullPath).isFile()
};
const isDirectory = (directory, currentDirectory) => {
  if (!currentDirectory) {
    currentDirectory = program.cwd();
  }
  const fullPath = path.join(currentDirectory, directory);

  return fs.lstatSync(fullPath).isDirectory();
}

if (options.files || (!options.filesInDirectory && !options.explorer)) {
  readFile(currentDirectory, isFile);
}
if (options.filesInDirectory) {
  const pathToDirectory = options.filesInDirectory;
  readFile(pathToDirectory, isFile);
}
if (options.explorer) {
  startFileExplorer(currentDirectory, isDirectory, isFile)
}

function readFile(pathToDirectory) {
  const list = fs.readdirSync(pathToDirectory)
                  .filter((file) => isFile(file, pathToDirectory));

  inquirer
    .prompt([
      {
        name: "name",
        type: "list",
        message: "Choose file:",
        choices: list
      }
    ])
    .then((answer) => {
      const fullPath = path.join(pathToDirectory, answer.name);
      printFile(fullPath, options.pattern);
    })
}

function startFileExplorer(pathToDirectory) {
  let list = fs.readdirSync(pathToDirectory);

  inquirer
    .prompt([
      {
        name: "name",
        type: "list",
        message: `${pathToDirectory} ->`,
        choices: list
      }
    ])
    .then((answer) => {
      const fullPath = path.join(pathToDirectory, answer.name);
      if (isDirectory(answer.name, pathToDirectory)) {
        startFileExplorer(fullPath);
      }
      if (isFile(answer.name, pathToDirectory)) {
        printFile(fullPath, options.pattern);
      }
    })
}

function printFile(fullPath, pattern) {
  if (pattern) {
    printFileWithFilter(fullPath, pattern);
    return;
  }
  
  fs.readFile(fullPath, 'utf-8', (_, data) => {
    console.log(data);
  })
}

function printFileWithFilter(fullPath, pattern) {
  const readStream = fs.createReadStream(fullPath, { encoding: 'utf-8' });
  const rl = readline.createInterface(readStream);
  const regex = new RegExp(pattern);
  let content = `Filter content with pattern '${pattern}': \n`;

  rl
    .on('line', (line) => {
      if (regex.test(line)) {
        content += line + '\n';
      }
    })
    .on('close', () => console.log(content));
}
#!/usr/bin/env node

import { Command } from 'commander';
import makeDiff from '../src/makeFlatDiff.js';
import makePath from '../src/makePath.js';

const program = new Command();

program

  .description('  Compares two configuration files and shows a difference.')
  .version('^10.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(makeDiff(...makePath(filepath1, filepath2)));
  });

program.parse();

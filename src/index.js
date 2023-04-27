import path from 'node:path';
import * as fs from 'node:fs';
import makePath from './makePath.js';
import makeParse from './parsers.js';
import makeDifferance from './makeDiff.js';
import makeFormattedDiff from './formaters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = makePath(filepath1);
  const absolutePath2 = makePath(filepath2);

  const dataOfFirst = fs.readFileSync(absolutePath1);
  const dataOfSecond = fs.readFileSync(absolutePath2);

  const extnameOfFirst = path.extname(absolutePath1);
  const extnameOfSecond = path.extname(absolutePath2);

  const data1 = makeParse(dataOfFirst, extnameOfFirst);
  const data2 = makeParse(dataOfSecond, extnameOfSecond);

  const diffTree = makeDifferance(data1, data2);

  return makeFormattedDiff(diffTree, format);
};

export default gendiff;

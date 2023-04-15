import * as fs from 'node:fs';
// import _ from 'lodash';

const makeDiff = (pathToFile1, pathToFile2) => {
  const fileInfo1 = JSON.parse(fs.readFileSync(pathToFile1));
  const fileInfo2 = JSON.parse(fs.readFileSync(pathToFile2));
  const newInfo = { ...fileInfo2, ...fileInfo1 };
  const sortedKeys = Object.keys(newInfo).sort();

  const resultArray = sortedKeys.map((key) => {
    if (Object.hasOwn(fileInfo1, key) && !Object.hasOwn(fileInfo2, key)) {
      return `  - ${key}: ${fileInfo1[key]}`;
    } if (!Object.hasOwn(fileInfo1, key) && Object.hasOwn(fileInfo2, key)) {
      return `  + ${key}: ${fileInfo2[key]}`;
    } if (Object.hasOwn(fileInfo1, key) && Object.hasOwn(fileInfo2, key)) {
      if (fileInfo1[key] !== fileInfo2[key]) {
        const first = `  - ${key}: ${fileInfo1[key]}`;
        const second = `  + ${key}: ${fileInfo2[key]}`;
        return [first, second].join('\n');
      }
    }
    return `    ${key}: ${fileInfo1[key]}`;
  });
  resultArray.unshift('{');
  resultArray.push('}');
  return resultArray.join('\n');
};

export default makeDiff;

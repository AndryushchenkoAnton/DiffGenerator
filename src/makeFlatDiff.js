import makeParse from './parsers.js';

const makeDiff = (pathToFile1, pathToFile2) => {
  const fileInfo1 = makeParse(pathToFile1);
  const fileInfo2 = makeParse(pathToFile2);
  const sortedKeys = Object.keys({ ...fileInfo2, ...fileInfo1 }).sort();

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

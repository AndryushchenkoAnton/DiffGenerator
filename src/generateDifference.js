import makeDifferance from './makeDiff.js';
import makeParse from './parsers.js';
import makeFormattedDiff from './formaters/index.js';

const generateDifferenceTree = (pathToFile1, pathToFile2, style = 'stylish') => {
  const object1 = makeParse(pathToFile1);
  const object2 = makeParse(pathToFile2);
  const diff = makeDifferance(object1, object2);
  return makeFormattedDiff(diff, style);
};

export default generateDifferenceTree;

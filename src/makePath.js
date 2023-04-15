import path from 'node:path';
import process from 'node:process';

const buildAbsolute = (pathTo) => {
  let newPath = pathTo;
  if (path.isAbsolute(pathTo)) {
    const current = process.cwd();
    newPath = `${path.resolve(current)}${pathTo}`;
  }
  return newPath;
};
const makePath = (path1, path2) => {
  let newPath1 = path1;
  let newPath2 = path2;
  newPath1 = buildAbsolute(newPath1);
  newPath2 = buildAbsolute(newPath2);
  return [newPath1, newPath2];
};

export default makePath;

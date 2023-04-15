import path from 'node:path';
import process from 'node:process';

const makePath = (path1, path2) => {
  let newPath1 = path1;
  let newPath2 = path2;
  if (path.isAbsolute(newPath1)) {
    const current = process.cwd();
    newPath1 = `${path.resolve(current)}${newPath1}`;
  }
  if (path.isAbsolute(newPath2)) {
    const current = process.cwd();
    newPath2 = `${path.resolve(current)}${newPath2}`;
  }
  return [newPath1, newPath2];
};

export default makePath;

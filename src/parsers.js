import yaml from 'js-yaml';
import path from 'node:path';
import * as fs from 'node:fs';

const makeParse = (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile);
  let parsedFileInfo;
  switch (format) {
    case '.json':
      parsedFileInfo = JSON.parse(data);
      break;
    case '.yml':
      parsedFileInfo = yaml.load(data);
      break;
    case '.yaml':
      parsedFileInfo = yaml.load(data);
      break;

    default:
  }

  return parsedFileInfo;
};

export default makeParse;

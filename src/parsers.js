import yaml from 'js-yaml';
import path from 'node:path';
import * as fs from 'node:fs';

const makeParse = (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile);
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);

    default:
  }
  return '';
};

export default makeParse;

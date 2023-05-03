import yaml from 'js-yaml';

const makeParse = (data, extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);

    default: throw new Error(`Extension ${extname} - is incorrect!`);
  }
};

export default makeParse;

import yaml from 'js-yaml';

const makeParse = (data, extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);

    default:
  }
  return data;
};

export default makeParse;

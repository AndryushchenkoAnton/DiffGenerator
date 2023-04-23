import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const index = {
  stylish,
  plain,
  json,
};

const makeFormattedDiff = (difference, formatStyle) => index[formatStyle](difference);

export default makeFormattedDiff;

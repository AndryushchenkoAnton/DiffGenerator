import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const makeFormattedDiff = (difference, formatStyle) => {
  switch (formatStyle.toLowerCase()) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    case 'json':
      return json(difference);
    default:
  }
  return null;
};

export default makeFormattedDiff;

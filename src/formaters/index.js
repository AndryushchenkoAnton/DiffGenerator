import stylish from './stylish.js';
import plain from './plain.js';

const index = {
  stylish,
  plain,
};

const makeFormattedDiff = (difference, formatStyle) => index[formatStyle](difference);

export default makeFormattedDiff;

import stylish from './stylish.js';

const formats = {
  stylish,
};

const makeFormattedDiff = (difference, formatStyle) => formats[formatStyle](difference);

export default makeFormattedDiff;

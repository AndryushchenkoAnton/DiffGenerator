import _ from 'lodash';
import {
  getType, getKey, getValue, getChangedValues,
} from '../methods.js';

const makeModule = (array, parents = []) => {
  const final = array.filter((el) => getType(el) !== 'unchanged').map((el) => iterPlain(el, [...parents]));
  return final.join('\n');
};
const makeFormattedValue = (value) => {
  let res = value;
  if (_.isObject(value)) {
    res = '[complex value]';
  } else if (_.isString(value)) {
    res = `'${value}'`;
  }
  return res;
};
const iterPlain = (valueOf, parents = []) => {
  const key = getKey(valueOf);
  const value = getValue(valueOf);
  const [original, changed] = getChangedValues(valueOf);
  const type = getType(valueOf);
  const way = [...parents, key].join('.');
  let string;
  switch (type) {
    case 'children':
      string = makeModule(value, [...parents, key]);
      break;
    case 'added':
      string = `Property '${way}' was added with value: ${makeFormattedValue(value)}`;
      break;
    case 'deleted':
      string = `Property '${way}' was removed`;
      break;
    case 'changed':
      string = `Property '${way}' was updated. From ${makeFormattedValue(original)} to ${makeFormattedValue(changed)}`;
      break;
    default:
      string = '';
  }
  return string;
};
const plain = (difference) => makeModule(difference);

export default plain;

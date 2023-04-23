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

  switch (type) {
    case 'children':
      return makeModule(value, [...parents, key]);
    case 'added':
      return `Property '${way}' was added with value: ${makeFormattedValue(value)}`;
    case 'deleted':
      return `Property '${way}' was removed`;

    case 'changed':
      return `Property '${way}' was updated. From ${makeFormattedValue(original)} to ${makeFormattedValue(changed)}`;

    default:
      return '';
  }
};
const plain = (difference) => makeModule(difference);

export default plain;

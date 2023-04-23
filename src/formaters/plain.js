import _ from 'lodash';
import {
  getChangedValues, getKey, getType, getValue,
} from '../methods.js';

const makeFormattedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
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

const makeModule = (array, parents = []) => array.filter((el) => getType(el) !== 'unchanged').map((el) => iterPlain(el, [...parents])).join('\n');

const plain = (difference) => makeModule(difference);
export default plain;

import _ from 'lodash';
import {
  getType, getKey, getValue, getChangedValues,
} from '../methods.js';

const makeSpace = (spaceSymbol, count = 2) => spaceSymbol.repeat(count);
const makeLine = (value, counter) => {
  if (!_.isObject(value)) {
    return value;
  }
  const res = Object
    .entries(value)
    .map(([key, val]) => `${makeSpace(' ', counter * 2)}${key}: ${makeLine(val, counter + 2)}`);
  return ['{', res.join('\n'), `${makeSpace(' ', counter * 2 - 4)}}`].join('\n');
};

const stylish = (differences, spaceCount = 2) => {
  const iter = (node, depth) => {
    if (getType(node) === 'children') {
      return `${makeSpace(' ', depth * 2 - 2)}  ${getKey(node)}: ${stylish(getValue(node), depth + 2)}`;
    }
    if (getType(node) === 'unchanged') {
      return `${makeSpace(' ', depth * 2)}${getKey(node)}: ${iter(getValue(node), depth + 2)}`;
    }
    if (getType(node) === 'changed') {
      const [original, changed] = getChangedValues(node);
      const first = `${makeSpace(' ', depth * 2 - 2)}- ${getKey(node)}: ${iter(original, depth + 2)}`;
      const second = `${makeSpace(' ', depth * 2 - 2)}+ ${getKey(node)}: ${iter(changed, depth + 2)}`;
      return [first, second].join('\n');
    } if (getType(node) === 'added') {
      return `${makeSpace(' ', depth * 2 - 2)}+ ${getKey(node)}: ${iter(getValue(node), depth + 2)}`;
    } if (getType(node) === 'deleted') {
      return `${makeSpace(' ', depth * 2 - 2)}- ${getKey(node)}: ${iter(getValue(node), depth + 2)}`;
    }
    return makeLine(node, depth);
  };
  return ['{', ...differences.map((el) => iter(el, spaceCount)), `${makeSpace(' ', spaceCount * 2 - 4)}}`].join('\n');
};

export default stylish;

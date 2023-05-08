import _ from 'lodash';
import {
  getType, getKey, getValue, getChangedValues,
} from '../methods.js';

const makeSpace = (spaceSymbol, count = 2) => spaceSymbol.repeat(count);

const stylish = (differences, space = 2) => {
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
    if (!_.isObject(node)) {
      return node;
    }
    const res = Object.entries(node).map(([key, val]) => `${makeSpace(' ', depth * 2)}${key}: ${iter(val, depth + 2)}`);
    return ['{', res.join('\n'), `${makeSpace(' ', depth * 2 - 4)}}`].join('\n');
  };
  return ['{', ...differences.map((el) => iter(el, space)), `${makeSpace(' ', space * 2 - 4)}}`].join('\n');
};

export default stylish;

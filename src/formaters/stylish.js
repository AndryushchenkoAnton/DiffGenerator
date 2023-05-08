import _ from 'lodash';
import {
  getType, getKey, getValue, getChangedValues,
} from '../methods.js';

const makeSpace = (spaceSymbol, count = 2) => spaceSymbol.repeat(count);

const makeDifferenceOfChildren = (array, depth) => {
  const iter = (node, currentDepth) => {
    if (!_.isObject(node) || !Object.hasOwn(node, 'type')) {
      if (!_.isObject(node)) {
        return node;
      }
      const res = Object
        .entries(node)
        .map(([key, val]) => `${makeSpace(' ', currentDepth * 2)}${key}: ${iter(val, currentDepth + 2)}`);
      return [
        '{',
        res.join('\n'),
        `${makeSpace(' ', currentDepth * 2 - 4)}}`,
      ].join('\n');
    }

    const type = getType(node);
    const key = getKey(node);
    if (type === 'children') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', currentDepth * 2 - 2)}  ${key}: ${makeDifferenceOfChildren(valueOfNode, currentDepth + 2)}`;
    }
    if (type === 'unchanged') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', currentDepth * 2)}${key}: ${iter(valueOfNode, currentDepth + 2)}`;
    }
    if (type === 'changed') {
      const [original, change] = getChangedValues(node);
      const first = `${makeSpace(' ', currentDepth * 2 - 2)}- ${key}: ${iter(original, currentDepth + 2)}`;
      const second = `${makeSpace(' ', currentDepth * 2 - 2)}+ ${key}: ${iter(change, currentDepth + 2)}`;
      return [first, second].join('\n');
    } if (type === 'added') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', currentDepth * 2 - 2)}+ ${key}: ${iter(valueOfNode, currentDepth + 2)}`;
    } if (type === 'deleted') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', currentDepth * 2 - 2)}- ${key}: ${iter(valueOfNode, currentDepth + 2)}`;
    }
    return null;
  };
  const final = array.map((el) => iter(el, depth));
  const res = ['{', ...final, `${makeSpace(' ', depth * 2 - 4)}}`];
  return res.join('\n');
};

const stylish = (differences) => makeDifferenceOfChildren(differences, 2);

export default stylish;

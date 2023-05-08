import _ from 'lodash';
import {
  getType, getKey, getValue, getChangedValues,
} from '../methods.js';

const makeSpace = (spaceSymbol, count = 2) => spaceSymbol.repeat(count);

const makeDifferenceOfChildren = (array, space) => {
  const iter = (node, depth) => {
    const makeLine = (currentNode, currentDepth) => {
      if (!_.isObject(currentNode)) {
        return currentNode;
      }
      const res = Object
        .entries(currentNode)
        .map(([key, val]) => `${makeSpace(' ', currentDepth * 2)}${key}: ${iter(val, currentDepth + 2)}`);
      return [
        '{',
        res.join('\n'),
        `${makeSpace(' ', currentDepth * 2 - 4)}}`,
      ].join('\n');
    };

    if (!_.isObject(node) || !Object.hasOwn(node, 'type')) {
      return makeLine(node, depth);
    }
    const type = getType(node);
    const key = getKey(node);
    if (type === 'children') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', depth * 2 - 2)}  ${key}: ${makeDifferenceOfChildren(valueOfNode, depth + 2)}`;
    }
    if (type === 'unchanged') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', depth * 2)}${key}: ${iter(valueOfNode, depth + 2)}`;
    }
    if (type === 'changed') {
      const [original, change] = getChangedValues(node);
      const first = `${makeSpace(' ', depth * 2 - 2)}- ${key}: ${iter(original, depth + 2)}`;
      const second = `${makeSpace(' ', depth * 2 - 2)}+ ${key}: ${iter(change, depth + 2)}`;
      return [first, second].join('\n');
    } if (type === 'added') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', depth * 2 - 2)}+ ${key}: ${iter(valueOfNode, depth + 2)}`;
    } if (type === 'deleted') {
      const valueOfNode = getValue(node);
      return `${makeSpace(' ', depth * 2 - 2)}- ${key}: ${iter(valueOfNode, depth + 2)}`;
    }
    return null;
  };
  const final = array.map((el) => iter(el, space));
  const res = ['{', ...final, `${makeSpace(' ', space * 2 - 4)}}`];
  return res.join('\n');
};

const stylish = (differences) => makeDifferenceOfChildren(differences, 2);

export default stylish;

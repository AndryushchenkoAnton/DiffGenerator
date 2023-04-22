import _ from 'lodash';
import {
  getType, getKey, getValue, getChangedValues,
} from '../methods.js';

const makeSpace = (spaceSymbol, count = 2) => spaceSymbol.repeat(count);

const stylish = (differences) => {
  const makeModule = (array, depth) => {
    const final = array.map((el) => iter(el, depth));
    final.unshift('{');
    final.push(`${makeSpace(' ', depth * 2 - 4)}}`);
    return final.join('\n');
  };
  const iter = (valueOf, count) => {
    const makeLine = (valueString, counter) => {
      if (!_.isObject(valueString)) {
        return valueString;
      }
      const res = Object
        .entries(valueString)
        .map(([key, val]) => `${makeSpace(' ', counter * 2)}${key}: ${iter(val, counter + 2)}`);
      return [
        '{',
        res.join('\n'),
        `${makeSpace(' ', counter * 2 - 4)}}`,
      ].join('\n');
    };

    if (!_.isObject(valueOf) || !Object.hasOwn(valueOf, 'type')) {
      return makeLine(valueOf, count);
    }
    const type = getType(valueOf);
    const key = getKey(valueOf);

    if (type === 'children') {
      const value = getValue(valueOf);
      return `${makeSpace(' ', count * 2 - 2)}  ${key}: ${makeModule(value, count + 2)}`;
    }
    if (type === 'unchanged') {
      const value = getValue(valueOf);
      return `${makeSpace(' ', count * 2)}${key}: ${iter(value, count + 2)}`;
    }
    if (type === 'changed') {
      const [original, change] = getChangedValues(valueOf);
      const first = `${makeSpace(' ', count * 2 - 2)}- ${key}: ${iter(original, count + 2)}`;
      const second = `${makeSpace(' ', count * 2 - 2)}+ ${key}: ${iter(change, count + 2)}`;
      return [first, second].join('\n');
    } if (type === 'added') {
      const value = getValue(valueOf);
      return `${makeSpace(' ', count * 2 - 2)}+ ${key}: ${iter(value, count + 2)}`;
    } if (type === 'deleted') {
      const value = getValue(valueOf);
      return `${makeSpace(' ', count * 2 - 2)}- ${key}: ${iter(value, count + 2)}`;
    }
    return null;
  };

  return makeModule(differences, 2);
};

export default stylish;

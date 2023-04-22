import _ from 'lodash';

const makeDifferance = (parsedFirstObject, parsedSecondObject) => {
  const makeDiffArr = (firstObject, secondObject) => {
    const keys = _.sortBy(_.union(_.keys(firstObject), _.keys(secondObject)));

    return keys.map((key) => {
      if (_.has(firstObject, key) && _.has(secondObject, key)) {
        if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
          return { key, type: 'children', value: makeDiffArr(firstObject[key], secondObject[key]) };
        }
        if (_.isEqual(firstObject[key], secondObject[key])) {
          return { key, type: 'unchanged', value: firstObject[key] };
        }
        return {
          key, type: 'changed', value1: firstObject[key], value2: secondObject[key],
        };
      }
      if (_.has(firstObject, key) && !_.has(secondObject, key)) {
        return { key, type: 'deleted', value: firstObject[key] };
      }
      if (!_.has(firstObject, key) && _.has(secondObject, key)) {
        return { key, type: 'added', value: secondObject[key] };
      }
      return null;
    });
  };
  return makeDiffArr(parsedFirstObject, parsedSecondObject);
};

export default makeDifferance;

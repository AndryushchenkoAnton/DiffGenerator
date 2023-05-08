import _ from 'lodash';

const getType = (object) => {
  if (_.isObject(object)) {
    return Object.hasOwn(object, 'type') ? object.type : false;
  }
  return null;
};
const getValue = (object) => object.value;
const getKey = (object) => object.key;
const getChangedValues = (object) => [object.value1, object.value2];

export {
  getType, getValue, getKey, getChangedValues,
};

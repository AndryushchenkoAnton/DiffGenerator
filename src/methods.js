const getType = (object) => object.type;
const getValue = (object) => object.value;
const getKey = (object) => object.key;
const getChangedValues = (object) => [object.value1, object.value2];

export {
  getType, getValue, getKey, getChangedValues,
};

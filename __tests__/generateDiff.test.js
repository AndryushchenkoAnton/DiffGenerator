import { fileURLToPath } from 'url';
import path from 'path';
import generateDifferenceTree from '../src/generateDifference.js';
import makeParse from '../src/parsers.js';

describe('output forms testing', () => {
  const getFixturePath = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '..', '__fixtures__', filename);
  };

  const stylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  const object = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  };
  const plain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  const json = '[{"key":"common","type":"children","value":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"deleted","value":200},{"key":"setting3","type":"changed","value1":true,"value2":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"children","value":[{"key":"doge","type":"children","value":[{"key":"wow","type":"changed","value1":"","value2":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"children","value":[{"key":"baz","type":"changed","value1":"bas","value2":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"changed","value1":{"key":"value"},"value2":"str"}]},{"key":"group2","type":"deleted","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

  test('make difference  default', () => {
    const example = generateDifferenceTree(getFixturePath('fileNestJson1.json'), getFixturePath('fileNestJson2.json'));
    const example2 = generateDifferenceTree(getFixturePath('fileNest1.yaml'), getFixturePath('fileNestJson2.json'));
    expect(example).toEqual(stylish);
    expect(example2).toEqual(stylish);
  });

  test('make difference  Stylish', () => {
    const example = generateDifferenceTree(getFixturePath('fileNest1.yaml'), getFixturePath('fileNest2.yml'), 'stylish');
    const example2 = generateDifferenceTree(getFixturePath('fileNest1.yaml'), getFixturePath('fileNestJson2.json'), 'stylish');
    expect(example).toEqual(stylish);
    expect(example2).toEqual(stylish);
  });

  test('make difference Plain', () => {
    const example = generateDifferenceTree(getFixturePath('fileNest1.yaml'), getFixturePath('fileNest2.yml'), 'plain');
    const example2 = generateDifferenceTree(getFixturePath('fileNestJson1.json'), getFixturePath('fileNest2.yml'), 'plain');
    expect(example).toEqual(plain);
    expect(example2).toEqual(plain);
  });

  test('make difference Json', () => {
    const example = generateDifferenceTree(getFixturePath('fileNest1.yaml'), getFixturePath('fileNest2.yml'), 'json');
    const example2 = generateDifferenceTree(getFixturePath('fileNestJson1.json'), getFixturePath('fileNestJson2.json'), 'json');
    expect(example).toEqual(json);
    expect(example2).toEqual(json);
  });

  test('parser', () => {
    const parsedData = makeParse(getFixturePath('fileNestJson1.json'));
    expect(parsedData).toEqual(object);
  });
});

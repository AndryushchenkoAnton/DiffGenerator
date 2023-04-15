import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/makeFlatDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const string = [
  ['{'],
  ['  - follow: false'],
  ['    host: hexlet.io'],
  ['  - proxy: 123.234.53.22'],
  ['  - timeout: 50'],
  ['  + timeout: 20'],
  ['  + verbose: true'],
  ['}'],
];
const string2 = [
  ['{'],
  ['    attitude: winner'],
  ['  - bride: Samanta'],
  ['  + bride: Erika'],
  ['  + goal: to test function'],
  ['  - name: file'],
  ['  + name: anotherFile'],
  ['  - position: none'],
  ['  + position: geschiden'],
  ['  - timeout: never'],
  ['}'],
];

test('make difference JSON', () => {
  const example = makeDiff(path.join(__dirname, '/__fixtures__/fileTest1.json'), path.join(__dirname, '/__fixtures__/fileTest2.json'));
  expect(example).toEqual(string2.join('\n'));
});

test('make difference YML', () => {
  const example = makeDiff(path.join(__dirname, '/__fixtures__/filepath1.yml'), path.join(__dirname, '/__fixtures__/filepath2.yml'));
  expect(example).toEqual(string.join('\n'));
});

test('make difference YAML', () => {
  const example = makeDiff(path.join(__dirname, '/__fixtures__/fileYaml1.yaml'), path.join(__dirname, '/__fixtures__/fileYaml2.yaml'));
  expect(example).toEqual(string2.join('\n'));
});

import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/makeFlatDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const string = [
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

test('make difference', () => {
  const exp = makeDiff(path.join(__dirname, '/__fixtures__/fileTest1.json'), path.join(__dirname, '/__fixtures__/fileTest2.json'));
  expect(exp).toEqual(string.join('\n'));
});

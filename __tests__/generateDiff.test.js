import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'node:fs';
import makeParse from '../src/parsers.js';
import gendiff from '../src/index.js';
import stylish from '../__fixtures__/stylish.js';
import plain from '../__fixtures__/plain.js';
import json from '../__fixtures__/json.js';
import object from '../__fixtures__/object.js';

describe('output forms testing', () => {
  const getFixturePath = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '..', '__fixtures__', filename);
  };

  const extensions = ['yml', 'json'];

  test.each(extensions)('tests with different extensions', (ext) => {
    const fileBefore = getFixturePath(`file1.${ext}`);
    const fileAfter = getFixturePath(`file2.${ext}`);

    expect(gendiff(fileBefore, fileAfter)).toEqual(stylish);
    expect(gendiff(fileBefore, fileAfter, 'stylish')).toEqual(stylish);
    expect(gendiff(fileBefore, fileAfter, 'plain')).toEqual(plain);
    expect(gendiff(fileBefore, fileAfter, 'json')).toEqual(json);
  });

  test('parser', () => {
    const extname = path.extname(getFixturePath('file1.json'));
    const data = fs.readFileSync(getFixturePath('file1.json'));
    const parsedData = makeParse(data, extname);
    expect(parsedData).toEqual(object);
  });
});

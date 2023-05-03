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
  test('make difference default', () => {
    const example = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    const example2 = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'));
    expect(example).toEqual(stylish);
    expect(example2).toEqual(stylish);
  });

  test('make difference Stylish', () => {
    const example = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish');
    const example2 = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'), 'stylish');
    expect(example).toEqual(stylish);
    expect(example2).toEqual(stylish);
  });

  test('make difference Plain', () => {
    const example = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain');
    const example2 = gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
    expect(example).toEqual(plain);
    expect(example2).toEqual(plain);
  });

  test('make difference Json', () => {
    const example = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json');
    const example2 = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
    expect(example).toEqual(json);
    expect(example2).toEqual(json);
  });

  test('parser', () => {
    const extname = path.extname(getFixturePath('file1.json'));
    const data = fs.readFileSync(getFixturePath('file1.json'));
    const parsedData = makeParse(data, extname);
    expect(parsedData).toEqual(object);
  });
});

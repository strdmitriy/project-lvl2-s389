import fs from 'fs';
import genDiff from '../src';

const beforeFileJSON = '__tests__/__fixtures__/before.json';
const afterFileJSON = '__tests__/__fixtures__/after.json';
const beforeFileYAM = '__tests__/__fixtures__/before.yaml';
const afterFileYAML = '__tests__/__fixtures__/after.yaml';
const resultFile = '__tests__/__fixtures__/difference.txt';


test('JSON', () => {
  expect(genDiff(beforeFileJSON, afterFileJSON)).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

test('YAML', () => {
  expect(genDiff(beforeFileYAM, afterFileYAML)).toBe(fs.readFileSync(resultFile, 'utf-8'));
});
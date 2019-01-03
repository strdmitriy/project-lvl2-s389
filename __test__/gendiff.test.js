import fs from 'fs';
import genDiff from '../src';

const beforeFileJSON = '__test__/__fixtures__/before.json';
const afterFileJSON = '__test__/__fixtures__/after.json';
const resultFile = '__test__/__fixtures__/difference.txt';


test('JSON', () => {
  expect(genDiff(beforeFileJSON, afterFileJSON)).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

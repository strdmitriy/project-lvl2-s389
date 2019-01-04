import fs from 'fs';
import genDiff from '../src';

const resultFile = '__tests__/__fixtures__/difference.txt';
const pathFixtures = '__tests__/__fixtures__/';

test.each([
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.yml', '.yml'],
  ['.ini', '.ini'],
])('before%s and after%s', (before, after) => expect(genDiff(`${pathFixtures}before${before}`, `${pathFixtures}after${after}`)).toBe(fs.readFileSync(resultFile, 'utf-8')));

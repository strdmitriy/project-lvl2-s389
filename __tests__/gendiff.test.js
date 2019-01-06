import fs from 'fs';
import genDiff from '../src';

const resultFile = '__tests__/__fixtures__/difference.txt';
const resultFileTree = '__tests__/__fixtures__/differenceTree.txt';
const pathFixtures = '__tests__/__fixtures__/';

test.each([
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.yml', '.yml'],
  ['.ini', '.ini'],
])('before%s and after%s', (before, after) => expect(genDiff(`${pathFixtures}before${before}`, `${pathFixtures}after${after}`)).toBe(fs.readFileSync(resultFile, 'utf-8')));

test.each([
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.yml', '.yml'],
  ['.ini', '.ini'],
])('beforeTree%s and afterTree%s', (before, after) => expect(genDiff(`${pathFixtures}beforeTree${before}`, `${pathFixtures}afterTree${after}`)).toBe(fs.readFileSync(resultFileTree, 'utf-8')));

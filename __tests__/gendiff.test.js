import fs from 'fs';
import genDiff from '../src';

const resultFileAst = '__tests__/__fixtures__/differenceTree.txt';
const resultFilePlain = '__tests__/__fixtures__/differenceTreePlain.txt';
const pathFixtures = '__tests__/__fixtures__/';

test.each([
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.yml', '.yml'],
  ['.ini', '.ini'],
])('before%s and after%s', (before, after) => expect(genDiff(`${pathFixtures}beforeTree${before}`, `${pathFixtures}afterTree${after}`, 'plain')).toBe(fs.readFileSync(resultFilePlain, 'utf-8')));

test.each([
  ['.json', '.json'],
  ['.yaml', '.yaml'],
  ['.yml', '.yml'],
  ['.ini', '.ini'],
])('beforeTree%s and afterTree%s', (before, after) => expect(genDiff(`${pathFixtures}beforeTree${before}`, `${pathFixtures}afterTree${after}`, 'ast')).toBe(fs.readFileSync(resultFileAst, 'utf-8')));

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseObj from './parsers';


const render = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const difference = keys.reduce((acc, key) => {
    if (!_.has(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    if (!_.has(obj1, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
    if (obj1[key] === obj2[key]) {
      return [...acc, `    ${key}: ${obj1[key]}`];
    } return [...acc, `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`];
  }, []);
  return `{\n${difference.join('\n')}\n}`;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContentBefore = fs.readFileSync(pathToFile1, 'utf8');
  const fileContentAfter = fs.readFileSync(pathToFile2, 'utf8');
  const extnameBefore = path.extname(pathToFile1);
  const extnameAfter = path.extname(pathToFile2);
  return render(parseObj(fileContentBefore, extnameBefore),
    parseObj(fileContentAfter, extnameAfter));
};

export default genDiff;

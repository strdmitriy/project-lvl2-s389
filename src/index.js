
import _ from 'lodash';
import fs from 'fs';

const parse = (obj1, obj2) => {
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

const genDiff = (pathToobj1, pathToobj2) => {
  const obj1 = JSON.parse(fs.readFileSync(pathToobj1));
  const obj2 = JSON.parse(fs.readFileSync(pathToobj2));
  return parse(obj1, obj2);
};

export default genDiff;

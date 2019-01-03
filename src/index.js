
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

const genDiff = (pathToFile1, pathToFile2) => {
  const beforeObj = JSON.parse(fs.readFileSync(pathToFile1));
  const afterObj = JSON.parse(fs.readFileSync(pathToFile2));
  return parse(beforeObj, afterObj);
};

export default genDiff;

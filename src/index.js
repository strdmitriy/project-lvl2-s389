
import { has } from 'lodash';
import fs from 'fs';

const getDiff = (beforeJson, afterJson) => {
  const keys = Object.keys({ ...beforeJson, ...afterJson });
  const difference = keys.reduce((acc, key) => {
    if (beforeJson[key] === afterJson[key]) {
      return [...acc, `   ${key}: ${beforeJson[key]}`];
    }
    if (!has(afterJson, key)) {
      return [...acc, ` - ${key}: ${beforeJson[key]}`];
    }
    if (!has(beforeJson, key)) {
      return [...acc, ` + ${key}: ${afterJson[key]}`];
    } return [...acc, ` + ${key}: ${afterJson[key]}\n - ${key}: ${beforeJson[key]}`];
  }, []);
  return console.log(`{\n${difference.join('\n')}\n}`);
};

const genDiff = (pathTobeforeJson, pathToafterJson) => {
  const beforeJson = JSON.parse(fs.readFileSync(pathTobeforeJson));
  const afterJson = JSON.parse(fs.readFileSync(pathToafterJson));
  return getDiff(beforeJson, afterJson);
};

export default genDiff;
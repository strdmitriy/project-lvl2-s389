import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseObj from './parsers';

const createAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const treeAst = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { name: key, type: 'removed', beforeJson: obj1[key] };
    } if (!_.has(obj1, key)) {
      return { name: key, type: 'added', afterJson: obj2[key] };
    } if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      const childrenObj1 = obj1[key];
      const childrenObj2 = obj2[key];
      const children = createAst(childrenObj1, childrenObj2);
      return { name: key, type: 'parent', children };
    } if (obj1[key] === obj2[key]) {
      return { name: key, type: 'unchanged', beforeJson: obj1[key] };
    } return {
      name: key, type: 'changed', beforeJson: obj1[key], afterJson: obj2[key],
    };
  });
  return treeAst;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContentBefore = fs.readFileSync(pathToFile1, 'utf8');
  const fileContentAfter = fs.readFileSync(pathToFile2, 'utf8');
  const extnameBefore = path.extname(pathToFile1);
  const extnameAfter = path.extname(pathToFile2);
  return createAst(parseObj(fileContentBefore, extnameBefore),
    parseObj(fileContentAfter, extnameAfter));
};

export default genDiff;

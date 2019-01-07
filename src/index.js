import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseObj from './parsers';
import renderers from './renderers';

const createAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const treeAst = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { name: key, type: 'deleted', oldValue: obj1[key] };
    } if (!_.has(obj1, key)) {
      return { name: key, type: 'added', newValue: obj2[key] };
    } if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return { name: key, type: 'parent', children: createAst(obj1[key], obj2[key]) };
    } if (obj1[key] === obj2[key]) {
      return { name: key, type: 'unchanged', oldValue: obj1[key] };
    } return {
      name: key, type: 'changed', newValue: obj2[key], oldValue: obj1[key],
    };
  });
  return treeAst;
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const fileContentBefore = fs.readFileSync(pathToFile1, 'utf8');
  const fileContentAfter = fs.readFileSync(pathToFile2, 'utf8');
  const extnameBefore = path.extname(pathToFile1);
  const extnameAfter = path.extname(pathToFile2);
  const astTree = createAst(parseObj(fileContentBefore, extnameBefore),
    parseObj(fileContentAfter, extnameAfter));
  return renderers(astTree, format);
};

export default genDiff;

import _ from 'lodash';

const renderValue = (value, indentWidth, indentation, nesting) => {
  const depth = nesting + 1;
  if (value instanceof Object) {
    const indentationValue = ' '.repeat(depth * indentWidth);
    const body = _.keys(value).map(key => `${indentationValue}${key}: ${renderValue(value[key])}`);
    return `{\n${body.join('\n')}\n${indentation}}`;
  } return value;
};

const renderingAstTree = (ast, nesting = 1) => {
  const indentWidth = 4;
  const indentation = ' '.repeat(nesting * indentWidth);
  const nodeList = (node) => {
    const {
      name, type, children, oldValue, newValue,
    } = node;
    if (type === 'parent') {
      return `${indentation}${name}: ${renderingAstTree(children, nesting + 1)}`;
    } if (type === 'added') {
      return `${indentation.slice(2)}+ ${name}: ${renderValue(newValue, indentWidth, indentation, nesting)}`;
    } if (type === 'deleted') {
      return `${indentation.slice(2)}- ${name}: ${renderValue(oldValue, indentWidth, indentation, nesting)}`;
    } if (type === 'changed') {
      return [`${indentation.slice(2)}- ${name}: ${renderValue(oldValue, indentWidth, indentation, nesting)}`, `${indentation.slice(2)}+ ${name}: ${renderValue(newValue, indentWidth, indentation, nesting)}`];
    } if (type === 'unchanged') {
      return `${indentation}${name}: ${renderValue(oldValue, indentWidth, indentation, nesting)}`;
    } return null;
  };
  const output = _.flatten(ast.reduce((acc, el) => [...acc, nodeList(el)], []));
  return `{\n${output.join('\n')}\n${indentation.slice(indentWidth)}}`;
};

export default renderingAstTree;

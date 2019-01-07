import _ from 'lodash';

const renderValue = (value, indentWidth, indentation, depth) => {
  const depthValue = depth + 1;
  if (!(value instanceof Object)) {
    return value;
  }
  const indentationValue = ' '.repeat(depthValue * indentWidth);
  const body = _.keys(value).map(key => `${indentationValue}${key}: ${renderValue(value[key])}`);
  return `{\n${body.join('\n')}\n${indentation}}`;
};

const renderingAstTree = (ast, depth = 1) => {
  const indentWidth = 4;
  const indentation = ' '.repeat(depth * indentWidth);
  const nodeList = (node) => {
    const {
      name, type, children, oldValue, newValue,
    } = node;
    switch (type) {
      case 'parent':
        return `${indentation}${name}: ${renderingAstTree(children, depth + 1)}`;
      case 'added':
        return `${indentation.slice(2)}+ ${name}: ${renderValue(newValue, indentWidth, indentation, depth)}`;
      case 'deleted':
        return `${indentation.slice(2)}- ${name}: ${renderValue(oldValue, indentWidth, indentation, depth)}`;
      case 'changed':
        return [`${indentation.slice(2)}- ${name}: ${renderValue(oldValue, indentWidth, indentation, depth)}`, `${indentation.slice(2)}+ ${name}: ${renderValue(newValue, indentWidth, indentation, depth)}`];
      case 'unchanged':
        return `${indentation}${name}: ${renderValue(oldValue, indentWidth, indentation, depth)}`;
      default:
        throw new Error(`Unknown type ${type}`);
    }
  };
  const output = _.flatten(ast.reduce((acc, el) => [...acc, nodeList(el)], []));
  return `{\n${output.join('\n')}\n${indentation.slice(indentWidth)}}`;
};

export default renderingAstTree;

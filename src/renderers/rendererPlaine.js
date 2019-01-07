const complexValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  } return value;
};

const renderingPlainTree = (ast) => {
  const iter = (node, acc, path) => {
    const {
      name, type, children, oldValue, newValue,
    } = node;
    const newAncestry = [...path, name];
    const fullPath = newAncestry.join('.');
    switch (type) {
      case 'parent':
        return [...acc, ...children.reduce((iAcc, n) => iter(n, iAcc, newAncestry), [])];
      case 'added':
        return [...acc, `Property ${fullPath} was added with '${complexValue(newValue)}'`];
      case 'deleted':
        return [...acc, `Property ${fullPath} was removed`];
      case 'changed':
        return [...acc, `Property '${fullPath}' was updated. From '${complexValue(oldValue)}' to '${complexValue(newValue)}'`];
      default:
        return acc;
    }
  };
  const output = ast.reduce((acc, node) => iter(node, acc, []), []);
  return output.join('\n');
};

export default renderingPlainTree;

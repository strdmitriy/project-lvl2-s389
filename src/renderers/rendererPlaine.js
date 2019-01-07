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
    if (type === 'parent') {
      return [...acc, ...children.reduce((iAcc, n) => iter(n, iAcc, newAncestry), [])];
    } if (type === 'added') {
      return [...acc, `Property ${fullPath} was added with '${complexValue(newValue)}'`];
    } if (type === 'deleted') {
      return [...acc, `Property ${fullPath} was removed`];
    } if (node.type === 'changed') {
      return [...acc, `Property '${fullPath}' was updated. From '${complexValue(oldValue)}' to '${complexValue(newValue)}'`];
    } return acc;
  };
  const output = ast.reduce((acc, node) => iter(node, acc, []), []);
  return output.join('\n');
};

export default renderingPlainTree;

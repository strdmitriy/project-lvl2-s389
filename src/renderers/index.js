import renderJson from './renderJson';
import renderPlain from './rendererPlane';

const render = (ast, format) => {
  if (format === 'plain') {
    return renderPlain(ast);
  } return renderJson(ast);
};

export default render;

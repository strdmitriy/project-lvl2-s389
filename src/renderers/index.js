import renderAst from './renderAst';
import renderJson from './renderJson';
import renderPlain from './rendererPlaine';

const render = (ast, format) => {
  if (format === 'plain') {
    return renderPlain(ast);
  } if (format === 'json') {
    return renderJson(ast);
  } return renderAst(ast);
};

export default render;

import renderAst from './renderAst';
import renderJson from './renderJson';
import renderPlain from './renderPlain';

const formatSelection = {
  json: renderJson,
  plain: renderPlain,
  ast: renderAst,
};

const render = (ast, format) => formatSelection[format](ast);

export default render;

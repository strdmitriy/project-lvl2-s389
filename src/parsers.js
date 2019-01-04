import yaml from 'js-yaml';
import ini from 'ini';

const parseSelection = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parseObj = (content, extname) => parseSelection[extname](content);

export default parseObj;

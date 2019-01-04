import yaml from 'js-yaml';
import ini from 'ini';

const parseObj = (file, extname) => {
  if (extname === '.json') {
    return JSON.parse(file);
  }
  if (extname === '.yaml' || extname === '.yml') {
    return yaml.safeLoad(file);
  }
  if (extname === '.ini') {
    return ini.parse(file);
  } return console.log('error');
};

export default parseObj;

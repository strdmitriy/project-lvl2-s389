import yaml from 'js-yaml';

const parseObj = (file, extname) => {
  if (extname === '.json') {
    return JSON.parse(file);
  }
  if (extname === '.yaml' || extname === '.yml') {
    return yaml.safeLoad(file);
  } return console.log('error');
};

export default parseObj;

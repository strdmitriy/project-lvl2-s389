#!/usr/bin/env node
import program from 'commander';
import version from '../../package.json';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.3')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const compile = require('../src');

const blepFilePath = path.join(process.cwd(), process.argv[2]);

if (fs.existsSync(blepFilePath)) {
  compile(fs.readFileSync(blepFilePath, 'utf-8'));
} else {
  throw new Error(`NOT FOUND: ${blepFilePath} does not exist`);
}

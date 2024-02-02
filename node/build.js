// const fs = require('fs-extra');
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { get_build_vers, build_ver_run, set_updateBuild, set_quietFlag } from './build_ver.js';

for (let index = 0; index < process.argv.length; index++) {
  // console.log(index, process.argv[index]);
  let val = process.argv[index];
  if (val == '--prod') {
    set_updateBuild(1);
  } else if (val == '--dev') {
    set_updateBuild(0);
  } else if (val == '--quiet') {
    set_quietFlag(1);
  } else if (!val.startsWith('/')) {
    console.log('Unknown option', val);
  }
}

// source files that will have ?v=<buildnumber> updated
const buildnum_files = ['../README.md', './README.md', './demo/', './lib/', './qrcode/'];

const root_path = join(__dirname, '..');
const src_path = join(root_path, 'src');
const buildnum_path = 'gen/build_ver.txt';
let build_ver = get_build_vers(src_path, buildnum_path);

build_ver_run(src_path, buildnum_path, build_ver, buildnum_files);

const fs = require('fs');
const { promisify } = require('util');
const combineFiles = require('combine-files');
const readdirAsync = promisify(fs.readdir);

async function stitch() {
  const files = await readdirAsync('slides/src');

  combineFiles(
    files.filter(includeFile).map(filename => `slides/src/${filename}`),
    'slides/stitched.md'
  );
}

const regex = /^\d.*$/;
function includeFile(name) {
  return regex.test(name);
}
stitch();

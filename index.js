// @flow
'use strict';

const pyarn = require('pyarn');
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const promisify = require('typeable-promisify');
const parseJson = require('parse-json');

/*::
type Globs = {
  [key: string]: string,
};

type Options = {
  cwd?: string,
  projectFiles?: Globs,
  workspaceFiles?: Globs,
};
*/

function readFile(fileName /*: string */) {
  return promisify(cb => fs.readFile(fileName, cb));
}

async function getFiles(cwd /*: string */, globs /*: Globs */) {
  let result = {};

  for (let name of Object.keys(globs)) {
    let fileNames = await globby(globs[name], { cwd });
    let promises = [];

    for (let fileName of fileNames) {
      let filePath = path.join(cwd, fileName);
      let promise = readFile(filePath).then(buffer => {
        let fileContents = buffer.toString();
        return { filePath, fileContents };
      });
      promises.push(promise);
    }

    result[name] = await Promise.all(promises);
  }

  return result;
}

async function getPackage(dir /*: string */, globs /*: Globs */) {
  let pkgPath = path.join(dir, 'package.json');
  let pkgContents = await readFile(pkgPath);
  let pkg = parseJson(pkgContents);
  let files = await getFiles(dir, globs);
  return { dir, pkgPath, pkg, files };
}

async function query(options /*: Options */ = {}) {
  let opts = Object.assign({
    cwd: process.cwd(),
    projectFiles: {},
    workspaceFiles: {},
  }, options);

  let dir = opts.cwd; // TODO: pyarn lookup root
  let pkg = await getPackage(dir, opts.projectFiles);
  let pkgDirs = await pyarn.getPackages({ cwd: dir });
  let promises = [];

  for (let pkgDir of pkgDirs) {
    promises.push(await getPackage(pkgDir, opts.workspaceFiles));
  }

  let workspaces = await Promise.all(promises);

  return Object.assign({}, pkg, { workspaces });
}

module.exports = query;

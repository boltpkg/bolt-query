// @flow
'use strict';

const path = require('path');
const query = require('./');

const DIRNAME = new RegExp(path.dirname(__dirname), 'g');
const fixturePath = path.join(__dirname, 'fixture');

function serialize(obj) {
  return JSON.stringify(obj, null, 2).replace(DIRNAME, '/..');
}

test('fixture', () => {
  return query({
    cwd: fixturePath,
    projectFiles: {
      readme: 'README.md',
      releases: 'releases/**/*.md',
    },
    workspaceFiles: {
      readme: 'README.md',
      docs: 'docs/**/*.md',
      examples: 'examples/**/*.js',
    },
  }).then(results => {
    expect(serialize(results)).toMatchSnapshot();
  });
});

test('fixture from nested folder', () => {
  return query({
    cwd: path.join(fixturePath, 'packages', 'bar'),
    projectFiles: {
      readme: 'README.md',
      releases: 'releases/**/*.md',
    },
    workspaceFiles: {
      readme: 'README.md',
      docs: 'docs/**/*.md',
      examples: 'examples/**/*.js',
    },
  }).then(results => {
    expect(serialize(results)).toMatchSnapshot();
  });
});

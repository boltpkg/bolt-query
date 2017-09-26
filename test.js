// @flow
'use strict';

const path = require('path');
const query = require('./');

const fixturePath = path.join(__dirname, 'fixture');

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
    expect(results).toMatchSnapshot();
  });
});

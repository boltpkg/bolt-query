// @flow
'use strict';

const path = require('path');
const query = require('./');

const fixturePath = path.join(__dirname, 'fixture');

test('fixture', async () => {
  let results = await query({
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
  });

  expect(results).toMatchSnapshot();
});



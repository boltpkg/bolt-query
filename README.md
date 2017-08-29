# pyarn-query

> Query info and files from your pyarn project

```js
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
```

```js
{
  dir: '/path/to/project',
  pkgPath: '/path/to/project/package.json',
  pkg: { name: 'project', pworkspaces: ['packages/*'], version: '1.0.0' },
  files: {
    readme: [
      { filePath: '/path/to/project/README.md', fileContents: '...' }
    ],
    releases: [
      { filePath: '/path/to/project/releases/introducing-fixture.md', fileContents: '...' },
      { filePath: '/path/to/project/releases/launching-1.0.md', fileContents: '...' }
    ],
  },
  workspaces: [{
    dir: '/path/to/project/packages/bar',
    pkgPath: '/path/to/project/packages/bar/package.json',
    pkg: { name: 'bar', version: '1.0.0' },
    files: {
      docs: [
        { filePath: '/path/to/project/packages/bar/docs/intro.md', fileContents: '...' }
      ],
      examples: [
        { filePath: '/path/to/project/packages/bar/examples/basic.js', fileContents: '...' }
      ],
      readme: [
        { filePath: '/path/to/project/packages/bar/README.md', fileContents: '...' }
      ],
    },
  }, {
    dir: '/path/to/project/packages/foo',
    pkgPath: '/path/to/project/packages/foo/package.json',
    pkg: { name: 'foo', version: '1.0.0' },
    files: {
      docs: [
        { filePath: '/path/to/project/packages/foo/docs/advanced/multiple.md', fileContents: '...' },
        { filePath: '/path/to/project/packages/foo/docs/intro.md', fileContents: '...' }
      ],
      examples: [
        { filePath: '/path/to/project/packages/foo/examples/advanced.js', fileContents: '...' },
        { filePath: '/path/to/project/packages/foo/examples/basic.js', fileContents: '...' }
      ],
      readme: [
        { filePath: '/path/to/project/packages/foo/README.md', fileContents: '...' }
      ]
    }
  }]
}
```

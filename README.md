# bolt-query

> Query info and files from your Bolt project

## Install

```sh
$ yarn add bolt-query
```

## Example

```js
const query = require('bolt-query');

query({
  projectFiles: {
    readme: 'README.md',
    releases: 'releases/**/*.md'
  },
  workspaceFiles: {
    readme: 'README.md',
    docs: 'docs/**/*.md',
    examples: 'examples/**/*.js'
  }
}).then(result => {
  // result from the query
})
```

result:

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

## Usage:

```js
query({ options })
```

=> Returns a promise with the information fetched using query

### options

- **cwd**: directory path to the project ( default : `process.cwd()`)

- **projectFiles**: Object describing the projet files. It accepts the file path as glob, and path are relative to project cwd option. example:
  ```
  {
    readme: <pathToReadme>,
    releases: '<pathToReleaseFiles>,
  }
  ```
- **workspaceFiles**: Object describing the files in workspace. It accepts the file path as glob, paths are relative to workspace root. example:
  ```
  {
    readme: <pathToReadme>,
    docs: <pathToDocs>,
    examples: <pathToExamples>,
  }
  ```

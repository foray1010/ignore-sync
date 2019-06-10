# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/foray1010/ignore-sync/compare/v1.2.0...v2.0.0) (2018-11-11)

### Bug Fixes

- do not trim space for ignore patterns and source tags ([a631e78](https://github.com/foray1010/ignore-sync/commit/a631e78))
- ensure only trailing line break is removed from generated files ([d23b84b](https://github.com/foray1010/ignore-sync/commit/d23b84b))

### Features

- accept paths as cli arguments & respect .gitignore in subdirectory ([af80fc9](https://github.com/foray1010/ignore-sync/commit/af80fc9))
- support `?` which match a single character in ignore file ([6f02e1b](https://github.com/foray1010/ignore-sync/commit/6f02e1b))

### BREAKING CHANGES

- paths are required
- source tags with space before opening tag will be ignored

## [1.2.0](https://github.com/foray1010/ignore-sync/compare/v1.1.0...v1.2.0) (2018-04-19)

### Features

- use process.cwd() if no package.json is found ([ef803f3](https://github.com/foray1010/ignore-sync/commit/ef803f3))

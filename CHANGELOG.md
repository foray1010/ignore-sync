# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.1.0](https://github.com/foray1010/ignore-sync/compare/v3.0.1...v3.1.0) (2021-02-05)

### Features

- support glob in local and relative source tag ([2a4519a](https://github.com/foray1010/ignore-sync/commit/2a4519a1d0f5b40ad650bba50451115d84b94f24))

### Bug Fixes

- **deps:** update dependency axios to v0.21.1 ([1ef8865](https://github.com/foray1010/ignore-sync/commit/1ef886543d43b4ae3c7950227e1c4f7f2cc7df6a))

### [3.0.1](https://github.com/foray1010/ignore-sync/compare/v3.0.0...v3.0.1) (2020-11-16)

### Bug Fixes

- **relative-tag:** missing \*\* in pattern & generate invalid ignore pattern on Windows ([#308](https://github.com/foray1010/ignore-sync/issues/308)) ([7fd174e](https://github.com/foray1010/ignore-sync/commit/7fd174eff0dbc8378ef8e638ca99014d7c47963b))

## [3.0.0](https://github.com/foray1010/ignore-sync/compare/v2.0.1...v3.0.0) (2020-11-04)

### ⚠ BREAKING CHANGES

- drop nodejs < 10.13

### Features

- append path to local files by [relative] ([#301](https://github.com/foray1010/ignore-sync/issues/301)) ([7e4a806](https://github.com/foray1010/ignore-sync/commit/7e4a80669e6f0b155630cbdf8f6a8f1c854a5cba))

### [2.0.1](https://github.com/foray1010/ignore-sync/compare/v2.0.0...v2.0.1) (2019-06-11)

### Bug Fixes

- **deps:** update dependency axios to v0.19.0 ([5b62722](https://github.com/foray1010/ignore-sync/commit/5b62722))
- **deps:** update dependency fs-extra to v8 ([#40](https://github.com/foray1010/ignore-sync/issues/40)) ([8c9d309](https://github.com/foray1010/ignore-sync/commit/8c9d309))

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

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/foray1010/ignore-sync/compare/v2.0.1...v3.0.0) (2020-11-04)

### ⚠ BREAKING CHANGES

- drop nodejs < 10.13

### Features

- append path to local files by [relative] ([#301](https://github.com/foray1010/ignore-sync/issues/301)) ([7e4a806](https://github.com/foray1010/ignore-sync/commit/7e4a80669e6f0b155630cbdf8f6a8f1c854a5cba))

### Bug Fixes

- **deps:** pin dependencies ([69b5eb1](https://github.com/foray1010/ignore-sync/commit/69b5eb12a43f8e985ab18fa7e53aeda682454d2b))
- **deps:** update dependency axios to v0.19.1 ([5a3aa1e](https://github.com/foray1010/ignore-sync/commit/5a3aa1e03e6d85b36fd58b51b764887d7b9854f9))
- **deps:** update dependency axios to v0.19.2 ([8d47cbc](https://github.com/foray1010/ignore-sync/commit/8d47cbc1467be17d75d4b73dff06f904e0785e81))
- **deps:** update dependency axios to v0.20.0 ([ec12f47](https://github.com/foray1010/ignore-sync/commit/ec12f476eeacfb681eb02e6df49f1a103290210c))
- **deps:** update dependency axios to v0.21.0 ([fa090f9](https://github.com/foray1010/ignore-sync/commit/fa090f91819de9e5fe60016143b4ac157dc8450d))
- **deps:** update dependency fs-extra to v8.1.0 ([3536edd](https://github.com/foray1010/ignore-sync/commit/3536edde967c1a74a5001a6010fd8d207cc07c77))
- **deps:** update dependency ignore to v5.1.4 ([0e48638](https://github.com/foray1010/ignore-sync/commit/0e486380d198469d868a559eebe1dcd190ab0c66))
- **deps:** update dependency ignore to v5.1.6 ([c7685fa](https://github.com/foray1010/ignore-sync/commit/c7685fa8897e5dfe122c567af362c257aa769c5d))
- **deps:** update dependency ignore to v5.1.8 ([31bc048](https://github.com/foray1010/ignore-sync/commit/31bc048f380b45181c8f09277abd27fdb403c579))
- **deps:** update dependency ramda to v0.27.1 ([140625c](https://github.com/foray1010/ignore-sync/commit/140625cfc190a866a8811abe6d2dfae0b326cdb3))
- support node 10.13 ([d9386c8](https://github.com/foray1010/ignore-sync/commit/d9386c85f0f0a3222331f3c09f09e7f85e820120))
- **deps:** update dependency ramda to v0.27.0 ([84a6457](https://github.com/foray1010/ignore-sync/commit/84a64575e7722d85e1e6fc2b9a6132a2b17d2092))

- require nodejs 10 ([b91f8b5](https://github.com/foray1010/ignore-sync/commit/b91f8b5613f078f3c9e55548f26e16cf503a14d6))

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

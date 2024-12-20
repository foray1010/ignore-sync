# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [8.0.0](https://github.com/foray1010/ignore-sync/compare/v7.0.1...v8.0.0) (2024-12-20)

### ⚠ BREAKING CHANGES

- require node `^18.12.0 || >=20.9.0`

### Bug Fixes

- ensure postinstall always succeeds ([ea27ed4](https://github.com/foray1010/ignore-sync/commit/ea27ed459d1cca69812f5a8b8155b9a3d2467c13))

### [7.0.1](https://github.com/foray1010/ignore-sync/compare/v7.0.0...v7.0.1) (2023-05-17)

### Bug Fixes

- use default branch instead of master ([993b749](https://github.com/foray1010/ignore-sync/commit/993b7495098d37ac9ab56506853b5948c9f7a9dc))

## [7.0.0](https://github.com/foray1010/ignore-sync/compare/v6.0.2...v7.0.0) (2023-05-02)

### ⚠ BREAKING CHANGES

- require node `^16.14.0 || >=18.12.0` ([a09d957](https://github.com/foray1010/ignore-sync/commit/a09d957650e56bdfcf651192525eb5b5b5645706))
- drop nodejs 14.17 and 18.11 ([3db126f](https://github.com/foray1010/ignore-sync/commit/3db126f9f8d72d7e3aad68fd0b38ba0743223d41))

### Bug Fixes

- support repository with dot or hyphen ([a731938](https://github.com/foray1010/ignore-sync/commit/a731938696d2bc1c7de92262015db6ab6b08167c))

### [6.0.2](https://github.com/foray1010/ignore-sync/compare/v6.0.1...v6.0.2) (2022-10-08)

### Bug Fixes

- fix a breaking change introduced by axios v1.1.2 ([ec435d2](https://github.com/foray1010/ignore-sync/commit/ec435d2c213c53bd0a984c6cf79b2edf7c1858cb))

### [6.0.1](https://github.com/foray1010/ignore-sync/compare/v6.0.0...v6.0.1) (2022-10-06)

### Bug Fixes

- fix a breaking change introduced by axios v1.1.0 ([f4db4eb](https://github.com/foray1010/ignore-sync/commit/f4db4eb49634bcd76b516cdcead36a5f8b392611))

## [6.0.0](https://github.com/foray1010/ignore-sync/compare/v5.0.1...v6.0.0) (2022-10-06)

### ⚠ BREAKING CHANGES

- drop node.js v12 and v17 ([238cdca](https://github.com/foray1010/ignore-sync/commit/238cdca920d1fdd36497715f9b2675a1adc1a602))

### Features

- support referencing other ignore-sync files ([00dd0ef](https://github.com/foray1010/ignore-sync/commit/00dd0ef1f862eada9a0028a272cf9dee7815bd96))

### [5.0.1](https://github.com/foray1010/ignore-sync/compare/v5.0.0...v5.0.1) (2022-04-07)

### Bug Fixes

- do not lock dependencies ([5145557](https://github.com/foray1010/ignore-sync/commit/51455570f73247db8e62c67ad942dc25b01d4bf5))

## [5.0.0](https://github.com/foray1010/ignore-sync/compare/v4.0.0...v5.0.0) (2022-04-07)

### ⚠ BREAKING CHANGES

- only support node ^12.22.0 || ^14.17.0 || >=16.13.0

### Bug Fixes

- **deps:** update dependency ramda to v0.28.0 ([2791564](https://github.com/foray1010/ignore-sync/commit/27915646df32afb7475b7eaec65e508d51fb20a3))
- ignore unnecessary files in release build ([d59c987](https://github.com/foray1010/ignore-sync/commit/d59c987a28d869bac9b0494dcc909ab16f1b8037))

- bump node version requirement ([c311a06](https://github.com/foray1010/ignore-sync/commit/c311a06fdd535bef9471561f3d2d5c02e34225ea))

## [4.0.0](https://github.com/foray1010/ignore-sync/compare/v3.1.0...v4.0.0) (2021-05-14)

### ⚠ BREAKING CHANGES

- drop node 10

### Bug Fixes

- **windows-paths:** always use posix join on normalized line ([#391](https://github.com/foray1010/ignore-sync/issues/391)) ([ed9c552](https://github.com/foray1010/ignore-sync/commit/ed9c552316c6e14a0b36ae5b77cd62ce1ceb9809))

- drop node 10 ([2b5f11a](https://github.com/foray1010/ignore-sync/commit/2b5f11a7257d84da9e20b450af8fa68763acf785))

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

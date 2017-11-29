'use strict'

const fs = require('fs-extra')
const path = require('path')
const pkgDir = require('pkg-dir')
const R = require('ramda')

const generateIgnoreFile = require('./generateIgnoreFile')
const getIgnoreSyncFiles = require('./getIgnoreSyncFiles')
const writeIgnoreFile = require('./writeIgnoreFile')
const {dynamicComposeP, promiseMap} = require('./utils/ramdaHelper')

module.exports = async () => {
  const projectRoot = await pkgDir()

  const ignoreSyncFilePaths = await getIgnoreSyncFiles(projectRoot)
  console.log(ignoreSyncFilePaths)

  const ignoreSyncFiles = await dynamicComposeP(
    R.map(String),
    promiseMap(fs.readFile),
    R.map((relativePath) => path.join(projectRoot, relativePath))
  )(ignoreSyncFilePaths)
  console.log(JSON.stringify(ignoreSyncFiles, null, 2))

  const ignoreFiles = await promiseMap((ignoreSyncFile) =>
    generateIgnoreFile(ignoreSyncFile, projectRoot))(ignoreSyncFiles)
  console.log(JSON.stringify(ignoreFiles, null, 2))

  await dynamicComposeP(
    promiseMap(([relativePath, ignoreFile]) =>
      writeIgnoreFile(relativePath, projectRoot, ignoreFile)),
    R.zip(ignoreSyncFilePaths)
  )(ignoreFiles)
}

'use strict'

const pkgDir = require('pkg-dir')
const R = require('ramda')

const generateIgnoreFile = require('./generateIgnoreFile')
const getIgnoreSyncFiles = require('./getIgnoreSyncFiles')
const readFileFromProjectRoot = require('./readFileFromProjectRoot')
const writeIgnoreFile = require('./writeIgnoreFile')
const {dynamicComposeP, promiseMap} = require('./utils/ramdaHelper')

module.exports = async () => {
  const projectRoot = await pkgDir()

  const ignoreSyncFilePaths = await getIgnoreSyncFiles(projectRoot)

  const ignoreSyncFiles = await promiseMap(
    readFileFromProjectRoot(projectRoot),
    ignoreSyncFilePaths
  )

  const ignoreFiles = await promiseMap(
    (ignoreSyncFile) => generateIgnoreFile(ignoreSyncFile, projectRoot),
    ignoreSyncFiles
  )

  await dynamicComposeP(
    promiseMap(([relativePath, ignoreFile]) =>
      writeIgnoreFile(relativePath, projectRoot, ignoreFile)),
    R.zip(ignoreSyncFilePaths)
  )(ignoreFiles)
}

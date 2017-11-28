'use strict'

const fs = require('fs-extra')
const R = require('ramda')

const generateIgnoreFile = require('./generateIgnoreFile')
const getIgnoreSyncFiles = require('./getIgnoreSyncFiles')
const writeIgnoreFile = require('./writeIgnoreFile')
const {composeAndPromiseAll, dynamicComposeP} = require('./utils/ramdaHelper')

module.exports = async () => {
  const projectRoot = process.cwd()

  const ignoreSyncFilePaths = await getIgnoreSyncFiles(projectRoot)
  console.log(ignoreSyncFilePaths)

  const ignoreSyncFiles = await R.composeP(R.map(String), composeAndPromiseAll(R.map(fs.readFile)))(
    ignoreSyncFilePaths
  )
  console.log(JSON.stringify(ignoreSyncFiles, null, 2))

  const ignoreFiles = await composeAndPromiseAll(
    R.map((ignoreSyncFile) => generateIgnoreFile(ignoreSyncFile, projectRoot))
  )(ignoreSyncFiles)
  console.log(JSON.stringify(ignoreFiles, null, 2))

  await dynamicComposeP(
    composeAndPromiseAll(
      R.map(([relativePath, ignoreFile]) => writeIgnoreFile(relativePath, projectRoot, ignoreFile))
    ),
    R.zip(ignoreSyncFilePaths)
  )(ignoreFiles)
}

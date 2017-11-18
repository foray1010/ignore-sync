'use strict'

const fs = require('fs-extra')
const R = require('ramda')

const decodeIgnoreSyncFile = require('./decodeIgnoreSyncFile')
const generateIgnoreFile = require('./generateIgnoreFile')
const getIgnoreSyncFiles = require('./getIgnoreSyncFiles')
const {composeAndPromiseAll, syncToAsync} = require('./utils/ramdaHelper')

module.exports = async () => {
  const projectRoot = process.cwd()

  const ignoreSyncFilePaths = await getIgnoreSyncFiles(projectRoot)
  console.log(ignoreSyncFilePaths)

  const ignoreSyncDataList = await R.composeP(
    syncToAsync(R.map(decodeIgnoreSyncFile)),
    syncToAsync(R.map(String)),
    composeAndPromiseAll(R.map(fs.readFile))
  )(ignoreSyncFilePaths)
  console.log(JSON.stringify(ignoreSyncDataList, null, 2))

  const ignoreFiles = await composeAndPromiseAll(
    R.map((ignoreSyncData) => generateIgnoreFile(ignoreSyncData, projectRoot))
  )(ignoreSyncDataList)
  console.log(JSON.stringify(ignoreFiles, null, 2))
}

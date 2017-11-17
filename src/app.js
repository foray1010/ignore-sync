'use strict'

const fs = require('fs-extra')
const R = require('ramda')

const decodeIgnoreSyncFile = require('./decodeIgnoreSyncFile')
const getIgnoreSyncFiles = require('./getIgnoreSyncFiles')
const {composeAndPromiseAll, syncToAsync} = require('./utils/ramdaHelper')

module.exports = async () => {
  const ignoreSyncFilePaths = await getIgnoreSyncFiles(process.cwd())
  console.log(ignoreSyncFilePaths)

  const ignoreSyncData = await R.composeP(
    syncToAsync(R.map(decodeIgnoreSyncFile)),
    syncToAsync(R.map(String)),
    composeAndPromiseAll(R.map(fs.readFile))
  )(ignoreSyncFilePaths)
  console.log(JSON.stringify(ignoreSyncData, null, 2))
}

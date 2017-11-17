'use strict'

const getIgnoreSyncFiles = require('./getIgnoreSyncFiles')

module.exports = async () => {
  const ignoreSyncFiles = await getIgnoreSyncFiles(process.cwd())
  console.log(ignoreSyncFiles)
}

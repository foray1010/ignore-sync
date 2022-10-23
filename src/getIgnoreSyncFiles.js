'use strict'

const isIgnoreSyncFile = require('./isIgnoreSyncFile.js')
const { readDir } = require('./utils/fsHelper.js')

const getIgnoreSyncFiles = async (absoluteDirPath) => {
  const absoluteFilePaths = await readDir(absoluteDirPath)
  return absoluteFilePaths.filter((x) => isIgnoreSyncFile(x))
}
module.exports = getIgnoreSyncFiles

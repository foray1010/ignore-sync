'use strict'

const isIgnoreSyncFile = require('./isIgnoreSyncFile')
const { readDir } = require('./utils/fsHelper')

const getIgnoreSyncFiles = async (absoluteDirPath) => {
  const absoluteFilePaths = await readDir(absoluteDirPath)
  return absoluteFilePaths.filter((x) => isIgnoreSyncFile(x))
}
module.exports = getIgnoreSyncFiles

'use strict'

const R = require('ramda')

const isIgnoreSyncFile = require('./isIgnoreSyncFile')
const {readDir} = require('./utils/fsHelper')

const getIgnoreSyncFiles = async (absoluteDirPath) => {
  const absoluteFilePaths = await readDir(absoluteDirPath)
  return R.filter(isIgnoreSyncFile, absoluteFilePaths)
}
module.exports = getIgnoreSyncFiles

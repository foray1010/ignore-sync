'use strict'

const path = require('path')
const R = require('ramda')

const isIgnoreSyncFile = require('./isIgnoreSyncFile')
const processDirectory = require('./processDirectory')
const processIgnoreSyncFile = require('./processIgnoreSyncFile')
const {isDirectory} = require('./utils/fsHelper')
const {promiseMap} = require('./utils/ramdaHelper')

const validateInputs = async (absolutePath) => {
  const isDir = await isDirectory(absolutePath)
  if (isDir) return

  if (!isIgnoreSyncFile(absolutePath)) {
    throw new Error(`${absolutePath} is not an ignore-sync file`)
  }
}

const startApp = async (cwd, relativePaths) => {
  const absolutePaths = R.map((p) => path.join(cwd, p), relativePaths)

  await promiseMap(validateInputs, absolutePaths)

  for (const absolutePath of absolutePaths) {
    const isDir = await isDirectory(absolutePath)
    if (isDir) {
      await processDirectory([absolutePath])
    } else {
      await processIgnoreSyncFile(absolutePath)
    }
  }
}
module.exports = startApp

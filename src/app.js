'use strict'

const path = require('path')

const isIgnoreSyncFile = require('./isIgnoreSyncFile.js')
const processDirectory = require('./processDirectory.js')
const processIgnoreSyncFile = require('./processIgnoreSyncFile.js')
const { isDirectory } = require('./utils/fsHelper.js')
const { promiseMap } = require('./utils/ramdaHelper.js')

const validateInputs = async (absolutePath) => {
  const isDir = await isDirectory(absolutePath)
  if (isDir) return

  if (!isIgnoreSyncFile(absolutePath)) {
    throw new Error(`${absolutePath} is not an ignore-sync file`)
  }
}

const startApp = async (cwd, relativePaths) => {
  const absolutePaths = relativePaths.map((p) => path.join(cwd, p))

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

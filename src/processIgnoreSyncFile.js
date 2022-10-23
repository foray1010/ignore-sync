'use strict'

const path = require('path')

const generateIgnoreFile = require('./generateIgnoreFile.js')
const renameIgnoreFile = require('./renameIgnoreFile.js')
const { overwriteFile, readFile } = require('./utils/fsHelper.js')

const processIgnoreSyncFile = async (absoluteFilePath) => {
  const ignoreSyncFile = await readFile(absoluteFilePath)

  const ignoreFile = await generateIgnoreFile(
    ignoreSyncFile,
    path.dirname(absoluteFilePath),
  )
  const ignoreFilePath = renameIgnoreFile(absoluteFilePath)

  await overwriteFile(ignoreFilePath, ignoreFile)
}
module.exports = processIgnoreSyncFile

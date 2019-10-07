'use strict'

const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const isReadable = async dataPath => {
  try {
    await fs.access(dataPath, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}
exports.isReadable = isReadable

const isDirectory = async dataPath => {
  const stats = await fs.stat(dataPath)
  return stats.isDirectory()
}
exports.isDirectory = isDirectory

const overwriteFile = async (filePath, fileStr) => {
  await fs.unlink(filePath).catch(() => {})
  await fs.writeFile(filePath, fileStr)
}
exports.overwriteFile = overwriteFile

const readDir = async absoluteDirPath => {
  const relativeDataPaths = await fs.readdir(absoluteDirPath)
  return R.map(relativeDataPath => path.join(absoluteDirPath, relativeDataPath), relativeDataPaths)
}
exports.readDir = readDir

const readFile = async filePath => {
  const fileBuffer = await fs.readFile(filePath)
  return String(fileBuffer)
}
exports.readFile = readFile

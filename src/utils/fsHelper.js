'use strict'

const fs = require('fs')
const path = require('path')

const isReadable = async dataPath => {
  try {
    await fs.promises.access(dataPath, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}
exports.isReadable = isReadable

const isDirectory = async dataPath => {
  const stats = await fs.promises.stat(dataPath)
  return stats.isDirectory()
}
exports.isDirectory = isDirectory

const overwriteFile = async (filePath, fileStr) => {
  await fs.promises.unlink(filePath).catch(() => {})
  await fs.promises.writeFile(filePath, fileStr)
}
exports.overwriteFile = overwriteFile

const readDir = async absoluteDirPath => {
  const relativeDataPaths = await fs.promises.readdir(absoluteDirPath)
  return relativeDataPaths.map(relativeDataPath => {
    return path.join(absoluteDirPath, relativeDataPath)
  })
}
exports.readDir = readDir

const readFile = async filePath => {
  const fileBuffer = await fs.promises.readFile(filePath)
  return String(fileBuffer)
}
exports.readFile = readFile

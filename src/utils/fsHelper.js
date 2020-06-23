'use strict'

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const fsAccess = promisify(fs.access)
const fsStat = promisify(fs.stat)
const fsUnlink = promisify(fs.unlink)
const fsWriteFile = promisify(fs.writeFile)
const fsReaddir = promisify(fs.readdir)
const fsReadFile = promisify(fs.readFile)

const isReadable = async (dataPath) => {
  try {
    await fsAccess(dataPath, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}
exports.isReadable = isReadable

const isDirectory = async (dataPath) => {
  const stats = await fsStat(dataPath)
  return stats.isDirectory()
}
exports.isDirectory = isDirectory

const overwriteFile = async (filePath, fileStr) => {
  await fsUnlink(filePath).catch(() => {})
  await fsWriteFile(filePath, fileStr)
}
exports.overwriteFile = overwriteFile

const readDir = async (absoluteDirPath) => {
  const relativeDataPaths = await fsReaddir(absoluteDirPath)
  return relativeDataPaths.map((relativeDataPath) => {
    return path.join(absoluteDirPath, relativeDataPath)
  })
}
exports.readDir = readDir

const readFile = async (filePath) => {
  const fileBuffer = await fsReadFile(filePath)
  return String(fileBuffer)
}
exports.readFile = readFile

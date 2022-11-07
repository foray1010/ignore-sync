import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const fsAccess = promisify(fs.access)
const fsStat = promisify(fs.stat)
const fsUnlink = promisify(fs.unlink)
const fsWriteFile = promisify(fs.writeFile)
const fsReaddir = promisify(fs.readdir)
const fsReadFile = promisify(fs.readFile)

export const isReadable = async (dataPath) => {
  try {
    await fsAccess(dataPath, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}

export const isDirectory = async (dataPath) => {
  const stats = await fsStat(dataPath)
  return stats.isDirectory()
}

export const overwriteFile = async (filePath, fileStr) => {
  await fsUnlink(filePath).catch(() => {})
  await fsWriteFile(filePath, fileStr)
}

export const readDir = async (absoluteDirPath) => {
  const relativeDataPaths = await fsReaddir(absoluteDirPath)
  return relativeDataPaths.map((relativeDataPath) => {
    return path.join(absoluteDirPath, relativeDataPath)
  })
}

export const readFile = async (filePath) => {
  const fileBuffer = await fsReadFile(filePath)
  return String(fileBuffer)
}

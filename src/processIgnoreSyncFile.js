import path from 'node:path'

import generateIgnoreFile from './generateIgnoreFile.js'
import renameIgnoreFile from './renameIgnoreFile.js'
import { overwriteFile, readFile } from './utils/fsHelper.js'

const processIgnoreSyncFile = async (absoluteFilePath) => {
  const ignoreSyncFile = await readFile(absoluteFilePath)

  const ignoreFile = await generateIgnoreFile(
    ignoreSyncFile,
    path.dirname(absoluteFilePath),
  )
  const ignoreFilePath = renameIgnoreFile(absoluteFilePath)

  await overwriteFile(ignoreFilePath, ignoreFile)
}
export default processIgnoreSyncFile

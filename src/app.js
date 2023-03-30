import path from 'node:path'

import isIgnoreSyncFile from './isIgnoreSyncFile.js'
import processDirectory from './processDirectory.js'
import processIgnoreSyncFile from './processIgnoreSyncFile.js'
import { isDirectory } from './utils/fsHelper.js'
import { promiseMap } from './utils/ramdaHelper.js'

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
    await (isDir
      ? processDirectory([absolutePath])
      : processIgnoreSyncFile(absolutePath))
  }
}
export default startApp

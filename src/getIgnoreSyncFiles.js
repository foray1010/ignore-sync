import isIgnoreSyncFile from './isIgnoreSyncFile.js'
import { readDir } from './utils/fsHelper.js'

const getIgnoreSyncFiles = async (absoluteDirPath) => {
  const absoluteFilePaths = await readDir(absoluteDirPath)
  return absoluteFilePaths.filter((x) => isIgnoreSyncFile(x))
}
export default getIgnoreSyncFiles

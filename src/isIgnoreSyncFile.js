import path from 'node:path'

const isIgnoreSyncFile = (filePath) => {
  return /.+ignore-sync$/u.test(path.basename(filePath))
}
export default isIgnoreSyncFile

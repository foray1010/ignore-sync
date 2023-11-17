import * as R from 'ramda'

const renameIgnoreFile = R.replace(/ignore-sync$/u, 'ignore')
export default renameIgnoreFile

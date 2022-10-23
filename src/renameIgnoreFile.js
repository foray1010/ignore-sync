import * as R from 'ramda'

const renameIgnoreFile = R.replace(/ignore-sync$/, 'ignore')
export default renameIgnoreFile

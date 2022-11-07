import * as R from 'ramda'

import { COMMENT_CHAR, LINE_BREAK } from './constants.js'

const removeEmptyLines = R.reject((line) => line === '')
const removeTrailingSpacesAndComment = R.replace(
  new RegExp(`\\s*(${COMMENT_CHAR}.*)?$`),
  '',
)

const cleanupIgnoreSyncFile = R.compose(
  R.join(LINE_BREAK),
  removeEmptyLines,
  R.map(removeTrailingSpacesAndComment),
  R.split(LINE_BREAK),
)
export default cleanupIgnoreSyncFile

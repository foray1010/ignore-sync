import * as R from 'ramda'

import { COMMENT_CHAR, LINE_BREAK } from './constants.js'

const removeEmptyLines = R.reject((line) => line === '')
const removeTrailingSpacesAndComment = R.ifElse(
  R.test(/^\[(.*)\]/u),
  R.replace(/\].*$/u, ']'),
  R.replace(new RegExp(`\\s*(${COMMENT_CHAR}.*)?$`, 'u'), ''),
)

const cleanupIgnoreSyncFile = R.compose(
  R.join(LINE_BREAK),
  removeEmptyLines,
  R.map(removeTrailingSpacesAndComment),
  R.split(LINE_BREAK),
)
export default cleanupIgnoreSyncFile

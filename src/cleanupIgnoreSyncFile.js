'use strict'

const R = require('ramda')

const { COMMENT_CHAR, LINE_BREAK } = require('./constants')

const removeEmptyLines = R.reject((line) => line === '')
const removeTrailingSpacesAndComment = R.replace(
  RegExp(`\\s*(${COMMENT_CHAR}.*)?$`),
  '',
)

const cleanupIgnoreSyncFile = R.compose(
  R.join(LINE_BREAK),
  removeEmptyLines,
  R.map(removeTrailingSpacesAndComment),
  R.split(LINE_BREAK),
)
module.exports = cleanupIgnoreSyncFile

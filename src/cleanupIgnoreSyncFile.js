'use strict'

const R = require('ramda')

const {COMMENT_CHAR, LINE_BREAK} = require('./constants')

const removeComment = R.compose(R.nth(0), R.split(COMMENT_CHAR))
const removeEmptyLines = R.reject((line) => line === '')

module.exports = R.compose(
  R.join(LINE_BREAK),
  removeEmptyLines,
  R.map(R.compose(R.trim, removeComment)),
  R.split(LINE_BREAK)
)

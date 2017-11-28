'use strict'

const R = require('ramda')

const removeComment = R.compose(R.nth(0), R.split('#'))
const removeEmptyLines = R.reject((line) => line === '')
const trimSpaces = R.compose(R.replace(/\s+/, ' '), R.trim)

module.exports = R.compose(
  R.join('\n'),
  removeEmptyLines,
  R.map(R.compose(trimSpaces, removeComment)),
  R.split('\n')
)

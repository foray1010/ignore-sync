'use strict'

const R = require('ramda')

const { LINE_BREAK } = require('../constants')

const joinLinesWithEOF = R.compose(
  R.replace(RegExp(LINE_BREAK + '*$'), LINE_BREAK),
  R.join(LINE_BREAK),
)
module.exports = joinLinesWithEOF

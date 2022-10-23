'use strict'

const R = require('ramda')

const { COMMENT_CHAR, LINE_BREAK } = require('../constants.json')

const spacing = ' '
const leftPad = COMMENT_CHAR + spacing
const rightPad = spacing + COMMENT_CHAR

const highlightComments = (commentStr) => {
  if (!commentStr) return ''

  const comments = commentStr.split(LINE_BREAK)

  const maxLen = Math.max(...comments.map(R.length))
  const lineLen = leftPad.length + maxLen + rightPad.length

  const paddedComments = comments.map(
    (comment) => leftPad + comment.padEnd(maxLen, spacing) + rightPad,
  )
  const verticalPad = COMMENT_CHAR.repeat(lineLen)

  return [verticalPad, ...paddedComments, verticalPad].join(LINE_BREAK)
}
module.exports = highlightComments

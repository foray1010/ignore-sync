'use strict'

const R = require('ramda')

const commentChar = '#'
const spacing = ' '
const leftPad = commentChar + spacing
const rightPad = spacing + commentChar

const linebreak = '\n'

module.exports = (commentStr) => {
  if (!commentStr) return ''

  const comments = commentStr.split(linebreak)

  const maxLen = Math.max(...R.map(R.length, comments))
  const lineLen = leftPad.length + maxLen + rightPad.length

  const paddedComments = R.map(
    (comment) => leftPad + comment.padEnd(maxLen, spacing) + rightPad,
    comments
  )
  const verticalPad = commentChar.repeat(lineLen)

  return [verticalPad, ...paddedComments, verticalPad].join(linebreak)
}

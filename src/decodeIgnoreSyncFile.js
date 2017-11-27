'use strict'

const R = require('ramda')

const removeComment = R.compose(R.nth(0), R.split('#'))
const trimSpaces = R.compose(R.replace(/\s+/, ' '), R.trim)

module.exports = (str) =>
  R.compose(
    R.reduce((acc, line) => {
      if (/^\[(.*)\]$/.test(line)) {
        return [
          ...acc,
          {
            source: RegExp.$1,
            data: []
          }
        ]
      }

      const lastBlock = R.last(acc)
      if (lastBlock) {
        lastBlock.data = [...lastBlock.data, line]
      }
      return acc
    }, []),
    R.filter(R.identity), // remove empty lines
    R.map(R.compose(trimSpaces, removeComment)),
    R.split('\n')
  )(str)

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

      if (!acc.length) throw new Error('source `[]` not found before ignore pattern is found')

      return [...R.init(acc), R.over(R.lensProp('data'), R.append(line), R.last(acc))]
    }, []),
    R.filter(R.identity), // remove empty lines
    R.map(R.compose(trimSpaces, removeComment)),
    R.split('\n')
  )(str)

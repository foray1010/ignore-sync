'use strict'

const R = require('ramda')

module.exports = (str) =>
  R.compose(
    R.reduce((acc, line) => {
      if (/^\[(.*)\]/.test(line)) {
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
    R.split('\n')
  )(str)

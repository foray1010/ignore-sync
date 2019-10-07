'use strict'

const R = require('ramda')

const cleanupIgnoreSyncFile = require('./cleanupIgnoreSyncFile')
const {LINE_BREAK} = require('./constants')

const appendToLastData = (blocks, datum) => [
  ...R.init(blocks),
  R.compose(
    R.over(R.lensProp('data'), R.append(datum)),
    R.last
  )(blocks)
]

const decodeIgnoreSyncFile = ignoreSyncFile =>
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

      return appendToLastData(acc, line)
    }, []),
    R.split(LINE_BREAK),
    cleanupIgnoreSyncFile
  )(ignoreSyncFile)
module.exports = decodeIgnoreSyncFile

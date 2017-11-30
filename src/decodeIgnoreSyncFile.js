'use strict'

const R = require('ramda')

const cleanupIgnoreSyncFile = require('./cleanupIgnoreSyncFile')

module.exports = (ignoreSyncFile) =>
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

      return R.converge(R.append, [
        R.compose(R.over(R.lensProp('data'), R.append(line)), R.last),
        R.init
      ])(acc)
    }, []),
    R.split('\n'),
    cleanupIgnoreSyncFile
  )(ignoreSyncFile)

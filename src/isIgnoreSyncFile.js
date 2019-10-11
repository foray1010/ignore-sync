'use strict'

const path = require('path')
const R = require('ramda')

const isIgnoreSyncFile = R.compose(
  R.test(/.+ignore-sync$/),
  path.basename,
)
module.exports = isIgnoreSyncFile

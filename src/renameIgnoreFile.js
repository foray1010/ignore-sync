'use strict'

const R = require('ramda')

const renameIgnoreFile = R.replace(/ignore-sync$/, 'ignore')
module.exports = renameIgnoreFile

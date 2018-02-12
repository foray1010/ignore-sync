'use strict'

const path = require('path')
const R = require('ramda')

module.exports = R.compose(R.test(/.+ignore-sync$/), path.basename)

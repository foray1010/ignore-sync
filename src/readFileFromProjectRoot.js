'use strict'

const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const {dynamicComposeP} = require('./utils/ramdaHelper')

module.exports = R.curry((projectRoot, filePath) =>
  dynamicComposeP(String, fs.readFile, (relativePath) => path.join(projectRoot, relativePath))(
    filePath
  ))

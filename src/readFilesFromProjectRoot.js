'use strict'

const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const {dynamicComposeP, promiseMap} = require('./utils/ramdaHelper')

module.exports = (filePaths, projectRoot) =>
  dynamicComposeP(
    R.map(String),
    promiseMap(fs.readFile),
    R.map((relativePath) => path.join(projectRoot, relativePath))
  )(filePaths)

'use strict'

const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

module.exports = R.curry(async (projectRoot, filePath) => {
  const absolutePath = path.join(projectRoot, filePath)
  const fileBuffer = await fs.readFile(absolutePath)
  return String(fileBuffer)
})

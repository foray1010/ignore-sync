'use strict'

const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const renameIgnoreFile = R.replace(/ignore-sync$/, 'ignore')

module.exports = async (relativePath, projectRoot, fileStr) => {
  const ignoreFilePath = R.compose(
    (newRelativePath) => path.join(projectRoot, newRelativePath),
    renameIgnoreFile
  )(relativePath)

  await fs.unlink(ignoreFilePath).catch(() => {})
  await fs.writeFile(ignoreFilePath, fileStr)
}

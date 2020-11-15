'use strict'

const path = require('path')

const { LINE_BREAK } = require('../constants')

module.exports = function formatRelativeIgnoreFile(fileContent, relativeDir) {
  const splittedFileContent = fileContent.split(LINE_BREAK)

  const edittedFileContent = splittedFileContent.map((line) => {
    if (!line) {
      return line
    }

    if (line.startsWith('#')) {
      return line
    }

    if (line.startsWith('!')) {
      return '!' + path.join(relativeDir, line.substring(1))
    }

    return path.join(relativeDir, line)
  })

  return edittedFileContent.join(LINE_BREAK)
}

'use strict'

const { LINE_BREAK } = require('../constants')

const prependRelativePath = (pattern, relativeDir) => {
  if (pattern.startsWith('!')) {
    return '!' + prependRelativePath(pattern.substring(1), relativeDir)
  }

  if (pattern.startsWith('/')) {
    return [relativeDir, pattern.substring(1)].join('/')
  }

  if (pattern.includes('/') && pattern.indexOf('/') !== pattern.length - 1) {
    return [relativeDir, pattern].join('/')
  }

  return [relativeDir, '**', pattern].join('/')
}

module.exports = function formatRelativeIgnoreFile(fileContent, relativeDir) {
  const splittedFileContent = fileContent.split(LINE_BREAK)

  const edittedFileContent = splittedFileContent.map((line) => {
    if (!line.trim()) {
      return line
    }

    if (line.startsWith('#')) {
      return line
    }

    return prependRelativePath(line, relativeDir)
  })

  return edittedFileContent.join(LINE_BREAK)
}

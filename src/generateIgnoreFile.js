'use strict'

const path = require('path')
const R = require('ramda')

const decodeIgnoreSyncFile = require('./decodeIgnoreSyncFile')
const github = require('./utils/github')
const highlightComments = require('./utils/highlightComments')
const joinLinesWithEOF = require('./utils/joinLinesWithEOF')
const { COMMENT_HEADER_ALERT, LINE_BREAK } = require('./constants')
const { dynamicComposeP, promiseMap } = require('./utils/ramdaHelper')
const { readFile } = require('./utils/fsHelper')

const isGithubSource = R.test(/^(\w+\/\w+)$/i)
const prependAlert = R.concat([highlightComments(COMMENT_HEADER_ALERT), ''])
const sourceIs = (...args) => R.compose(...args, R.prop('source'))

const inlineSourceFetcher = R.compose(joinLinesWithEOF, R.prop('data'))
const githubSourceFetcher = async (block) => {
  const [owner, repo] = block.source.split('/')
  const files = await promiseMap(
    (relativePath) =>
      github.getContentFile({ owner, repo, path: relativePath }),
    block.data,
  )
  return joinLinesWithEOF(files)
}
const localSourceFetcher = async (block, directory) => {
  const files = await promiseMap(
    (relativeFilePath) => readFile(path.join(directory, relativeFilePath)),
    block.data,
  )
  return joinLinesWithEOF(files)
}
const relativeSourceFetcher = async (block, directory) => {
  const files = await promiseMap(
    async (relativeFilePath) => {
      const filePath = path.dirname(relativeFilePath)
      const fileContent = await readFile(path.join(directory, relativeFilePath))
      const splittedFileContent = fileContent.split(LINE_BREAK)
      const edittedFileContent = splittedFileContent.map(line => {
        if (!line) {
          return line
        }

        if (line.startsWith('!')) {
          return '!' + path.join(filePath, line.substring(1));
        }

        return path.join(filePath, line)
      })

      return edittedFileContent.join(LINE_BREAK)
    },
    block.data
  )
  return joinLinesWithEOF(files)
}

const generateIgnoreFile = (ignoreSyncFile, directory) => {
  const fetchIgnorePatternsBySource = promiseMap(
    R.cond([
      [sourceIs(R.equals('inline')), inlineSourceFetcher],
      [
        sourceIs(R.equals('local')),
        (block) => localSourceFetcher(block, directory),
      ],
      [
        sourceIs(R.equals('relative')),
        (block) => relativeSourceFetcher(block, directory),
      ],
      [sourceIs(isGithubSource), githubSourceFetcher],
      [
        R.T,
        (block) => {
          throw new Error(`unknown source: ${block.source}`)
        },
      ],
    ]),
  )

  return dynamicComposeP(
    joinLinesWithEOF,
    prependAlert,
    fetchIgnorePatternsBySource,
    decodeIgnoreSyncFile,
  )(ignoreSyncFile)
}
module.exports = generateIgnoreFile

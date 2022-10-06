'use strict'

const path = require('path')
const R = require('ramda')

const decodeIgnoreSyncFile = require('./decodeIgnoreSyncFile')
const formatRelativeIgnoreFile = require('./utils/formatRelativeIgnoreFile')
const github = require('./utils/github')
const highlightComments = require('./utils/highlightComments')
const isIgnoreSyncFile = require('./isIgnoreSyncFile')
const joinLinesWithEOF = require('./utils/joinLinesWithEOF')
const { COMMENT_HEADER_ALERT } = require('./constants')
const { dynamicComposeP, promiseMap } = require('./utils/ramdaHelper')
const { readFile } = require('./utils/fsHelper')

const isGithubSource = R.test(/^(\w+\/\w+)$/i)
const prependAlert = R.concat([highlightComments(COMMENT_HEADER_ALERT), ''])
const sourceIs = (...args) => R.compose(...args, R.prop('source'))

const inlineSourceFetcher = R.compose(joinLinesWithEOF, R.prop('data'))
const githubSourceFetcher = async (block) => {
  const [owner, repo] = block.source.split('/')
  const files = await Promise.all(
    block.data.map((relativeFilePath) => {
      return github.getContentFile({ owner, repo, path: relativeFilePath })
    }),
  )
  return joinLinesWithEOF(files)
}
const localSourceFetcher = async (block, directory) => {
  const files = await Promise.all(
    block.data.map(async (relativeFilePath) => {
      const fileContent = await readFile(path.join(directory, relativeFilePath))
      if (isIgnoreSyncFile(relativeFilePath)) {
        return generateIgnoreFile(fileContent, directory, {
          isRootIgnoreSyncFile: false,
        })
      } else {
        return fileContent
      }
    }),
  )
  return joinLinesWithEOF(files)
}
const relativeSourceFetcher = async (block, directory) => {
  const files = await Promise.all(
    block.data.map(async (relativeFilePath) => {
      const fileContent = await readFile(path.join(directory, relativeFilePath))
      if (isIgnoreSyncFile(relativeFilePath)) {
        const ignoreFileContent = await generateIgnoreFile(
          fileContent,
          directory,
          {
            isRootIgnoreSyncFile: false,
          },
        )
        return formatRelativeIgnoreFile(
          ignoreFileContent,
          path.dirname(relativeFilePath),
        )
      } else {
        return formatRelativeIgnoreFile(
          fileContent,
          path.dirname(relativeFilePath),
        )
      }
    }),
  )
  return joinLinesWithEOF(files)
}

const generateIgnoreFile = (
  ignoreSyncFile,
  directory,
  { isRootIgnoreSyncFile = true } = {},
) => {
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
    isRootIgnoreSyncFile ? prependAlert : R.identity,
    fetchIgnorePatternsBySource,
    decodeIgnoreSyncFile,
  )(ignoreSyncFile)
}
module.exports = generateIgnoreFile

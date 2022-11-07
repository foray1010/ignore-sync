import path from 'node:path'

import * as R from 'ramda'

import { COMMENT_HEADER_ALERT } from './constants.js'
import decodeIgnoreSyncFile from './decodeIgnoreSyncFile.js'
import isIgnoreSyncFile from './isIgnoreSyncFile.js'
import formatRelativeIgnoreFile from './utils/formatRelativeIgnoreFile.js'
import { readFile } from './utils/fsHelper.js'
import { getGitHubContentFile } from './utils/github.js'
import highlightComments from './utils/highlightComments.js'
import joinLinesWithEOF from './utils/joinLinesWithEOF.js'
import { dynamicComposeP, promiseMap } from './utils/ramdaHelper.js'

const isGithubSource = R.test(/^(\w+\/\w+)$/i)
const prependAlert = R.concat([highlightComments(COMMENT_HEADER_ALERT), ''])
const sourceIs = (...args) => R.compose(...args, R.prop('source'))

const inlineSourceFetcher = R.compose(joinLinesWithEOF, R.prop('data'))
const githubSourceFetcher = async (block) => {
  const [owner, repo] = block.source.split('/')
  const files = await Promise.all(
    block.data.map((relativeFilePath) => {
      return getGitHubContentFile({ owner, repo, path: relativeFilePath })
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
export default generateIgnoreFile

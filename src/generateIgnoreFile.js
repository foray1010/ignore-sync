'use strict'

const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const decodeIgnoreSyncFile = require('./decodeIgnoreSyncFile')
const github = require('./utils/github')
const {composeAndPromiseAll, dynamicComposeP} = require('./utils/ramdaHelper')

const joinLinesWithEOF = R.compose(R.flip(R.concat)('\n'), R.trim, R.join('\n'))

const inlineSourceFetcher = R.compose(joinLinesWithEOF, R.prop('data'))
const githubSourceFetcher = async (block) => {
  const [owner, repo] = block.source.split('/')
  const files = await composeAndPromiseAll(
    R.map((relativePath) => github.getContentFile(owner, repo, relativePath))
  )(block.data)
  return joinLinesWithEOF(files)
}
const localSourceFetcher = async (block, projectRoot) => {
  const fileBuffers = await composeAndPromiseAll(
    R.map(fs.readFile),
    R.map((relativePath) => path.join(projectRoot, relativePath))
  )(block.data)
  const files = R.map(String, fileBuffers)
  return joinLinesWithEOF(files)
}

module.exports = (ignoreSyncFile, projectRoot) => {
  const isGithubSource = R.test(/^(\w+\/\w+)$/i)
  const sourceIs = (...args) => R.pipe(R.prop('source'), ...args)

  const fetchIgnorePatternsBySource = composeAndPromiseAll(
    R.map(
      R.cond([
        [sourceIs(R.equals('inline')), inlineSourceFetcher],
        [sourceIs(R.equals('local')), (block) => localSourceFetcher(block, projectRoot)],
        [sourceIs(isGithubSource), githubSourceFetcher],
        [
          R.T,
          (block) => {
            throw new Error(`unknown source: ${block.source}`)
          }
        ]
      ])
    )
  )

  return dynamicComposeP(joinLinesWithEOF, fetchIgnorePatternsBySource, decodeIgnoreSyncFile)(
    ignoreSyncFile
  )
}

'use strict'

const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const github = require('./utils/github')
const {composeAndPromiseAll} = require('./utils/ramdaHelper')

const joinLines = R.join('\n')
const removeComments = R.map(R.compose(R.nth(0), R.split('#')))
const removeEmptyLines = R.filter(R.identity)
const trimSpaces = R.compose(R.replace(/\s+/, ' '), R.trim)

const inlineSourceFetcher = R.compose(joinLines, R.prop('data'))
const localSourceFetcher = async (block, projectRoot) => {
  const fileBuffers = await composeAndPromiseAll(
    R.map(fs.readFile),
    R.map((relativePath) => path.join(projectRoot, relativePath)),
    removeEmptyLines,
    R.map(trimSpaces),
    removeComments
  )(block.data)
  const files = R.map(String, fileBuffers)
  return joinLines(files)
}
const githubSourceFetcher = async (block) => {
  const [owner, repo] = block.source.split('/')
  const files = await composeAndPromiseAll(
    R.map((relativePath) => github.getContentFile(owner, repo, relativePath)),
    removeEmptyLines,
    R.map(trimSpaces),
    removeComments
  )(block.data)
  return joinLines(files)
}

module.exports = async (ignoreSyncData, projectRoot) => {
  const isGithubSource = R.test(/^(\w+\/\w+)$/i)
  const sourceIs = (...args) => R.pipe(R.prop('source'), ...args)

  const blocks = await composeAndPromiseAll(
    R.map(
      R.cond([
        [sourceIs(R.equals('inline')), inlineSourceFetcher],
        [sourceIs(R.equals('local')), (block) => localSourceFetcher(block, projectRoot)],
        [sourceIs(isGithubSource), githubSourceFetcher],
        [
          R.T,
          (ignoreSyncBlock) => {
            throw new Error(`unknown source: ${ignoreSyncBlock.source}`)
          }
        ]
      ])
    )
  )(ignoreSyncData)
  return joinLines(blocks)
}

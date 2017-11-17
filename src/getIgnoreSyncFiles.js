'use strict'

const fs = require('fs-extra')
const ignore = require('ignore')
const path = require('path')
const R = require('ramda')

const filterIgnoreSyncFiles = R.compose(R.test(/\..+ignore-sync$/), path.basename)

const getIgnorePattern = async (projectRoot) => {
  const gitingorePath = path.join(projectRoot, '.gitignore')
  try {
    const gitignore = await fs.readFile(gitingorePath)
    return gitignore.toString()
  } catch (err) {
    return null
  }
}

const getIsIgnored = async (projectRoot) => {
  const ignorePattern = await getIgnorePattern(projectRoot)
  if (ignorePattern) {
    const ignoreInstance = ignore()
    return R.bind(ignoreInstance.add(ignorePattern).ignores, ignoreInstance)
  } else {
    return R.always(false)
  }
}

const scanDir = (relativeDir, projectRoot, isIgnored) => {
  const syncToAsync = (fn) => (...args) => Promise.resolve(fn(...args))

  const getRelativePaths = R.compose(
    R.bind(Promise.all, Promise),
    R.map(async (relativePath) => {
      const stats = await fs.stat(path.join(projectRoot, relativePath))
      return relativePath + (stats.isDirectory() ? '/' : '')
    }),
    R.map((file) => path.join(relativeDir, file))
  )

  const recursiveScan = R.compose(
    R.bind(Promise.all, Promise),
    R.map(
      R.ifElse(
        R.test(/\/$/),
        (relativePath) => scanDir(relativePath, projectRoot, isIgnored),
        R.identity
      )
    )
  )

  const dirPath = path.resolve(projectRoot, relativeDir)
  return R.composeP(
    syncToAsync(R.flatten),
    recursiveScan,
    syncToAsync(R.reject(isIgnored)),
    getRelativePaths,
    fs.readdir
  )(dirPath)
}

module.exports = async (projectRoot) => {
  const isIgnored = await getIsIgnored(projectRoot)

  const relativePaths = await scanDir('.', projectRoot, isIgnored)

  return R.filter(filterIgnoreSyncFiles, relativePaths)
}

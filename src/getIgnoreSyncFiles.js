'use strict'

const fs = require('fs-extra')
const ignore = require('ignore')
const path = require('path')
const R = require('ramda')

const isIgnoreSyncFile = require('./isIgnoreSyncFile')
const {dynamicComposeP, promiseMap} = require('./utils/ramdaHelper')

const getIgnorePattern = async (dir) => {
  const gitingorePath = path.join(dir, '.gitignore')
  try {
    const gitignore = await fs.readFile(gitingorePath)
    return String(gitignore)
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
  const getRelativePaths = dynamicComposeP(
    promiseMap(async (relativePath) => {
      const stats = await fs.stat(path.join(projectRoot, relativePath))
      return relativePath + (stats.isDirectory() ? '/' : '')
    }),
    R.map((file) => path.join(relativeDir, file))
  )

  const recursiveScan = promiseMap(
    R.when(R.test(/\/$/), (relativePath) => scanDir(relativePath, projectRoot, isIgnored))
  )

  const dirPath = path.resolve(projectRoot, relativeDir)
  return R.composeP(R.flatten, recursiveScan, R.reject(isIgnored), getRelativePaths, fs.readdir)(
    dirPath
  )
}

module.exports = async (projectRoot) => {
  const isIgnored = await getIsIgnored(projectRoot)

  const relativePaths = await scanDir('.', projectRoot, isIgnored)

  return R.filter(isIgnoreSyncFile, relativePaths)
}

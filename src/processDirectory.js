'use strict'

const ignore = require('ignore')
const path = require('path')
const R = require('ramda')

const getIgnoreSyncFiles = require('./getIgnoreSyncFiles')
const processIgnoreSyncFile = require('./processIgnoreSyncFile')
const {
  isDirectory,
  isReadable,
  readDir,
  readFile,
} = require('./utils/fsHelper')
const { promiseFilter, promiseMap } = require('./utils/ramdaHelper')

const filterByGitIgnoreFilters = (absoluteDataPaths, gitIgnoreFilters) => {
  if (gitIgnoreFilters.length === 0) return absoluteDataPaths
  return absoluteDataPaths.filter(R.allPass(gitIgnoreFilters))
}

const filterDirPaths = R.composeWith(R.andThen)([
  R.map(R.concat(R.__, path.sep)),
  promiseFilter(isDirectory),
])

const getGitIgnoreFilter = async (directory) => {
  const gitIgnorePath = path.join(directory, '.gitignore')
  const isGitIgnoreReadable = await isReadable(gitIgnorePath)
  if (isGitIgnoreReadable) {
    const gitIgnorePattern = await readFile(gitIgnorePath)
    const gitIgnore = ignore().add(gitIgnorePattern)
    return (absolutePath) => {
      const relativePath =
        path.relative(directory, absolutePath) +
        // keep trailing `path.sep` as gitignore may use it to ignore directories
        (absolutePath.endsWith(path.sep) ? path.sep : '')
      return !gitIgnore.ignores(relativePath)
    }
  }
  return null
}

const processDirectory = async (directories, gitIgnoreFilters = []) => {
  // TODO: filter readable directories here

  for (const directory of directories) {
    const ignoreSyncFilePaths = await getIgnoreSyncFiles(directory)
    await promiseMap(processIgnoreSyncFile, ignoreSyncFilePaths)

    const gitIgnore = await getGitIgnoreFilter(directory)
    const updatedGitIgnoreFilters = [...gitIgnoreFilters, gitIgnore].filter(
      Boolean,
    )

    const absoluteDataPaths = await readDir(directory)
    const absoluteDirPaths = await filterDirPaths(absoluteDataPaths)
    const filteredDirPaths = filterByGitIgnoreFilters(
      absoluteDirPaths,
      updatedGitIgnoreFilters,
    )

    processDirectory(filteredDirPaths, updatedGitIgnoreFilters)
  }
}
module.exports = processDirectory

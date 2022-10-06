'use strict'

const axios = require('axios').default

const getContentFile = async ({
  owner,
  path,
  ref = 'master', // commit/branch/tag
  repo,
}) => {
  const { data: file } = await axios.get(
    `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`,
  )
  return file
}
exports.getContentFile = getContentFile

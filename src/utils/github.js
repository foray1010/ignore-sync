'use strict'

const axios = require('axios')

const getContentFile = async (owner, repo, resourcePath) => {
  const {data: file} = await axios.get(
    `https://raw.githubusercontent.com/${owner}/${repo}/master/${resourcePath}`
  )
  return file
}
exports.getContentFile = getContentFile

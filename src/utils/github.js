import axios from 'axios'

export const getGitHubContentFile = async ({
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

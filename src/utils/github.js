import axios from 'axios'
import * as R from 'ramda'

const getDefaultBranch = R.memoizeWith(
  ({ owner, repo }) => `${owner}/${repo}`,
  async ({ owner, repo }) => {
    const { data: repoData } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
    )
    return repoData.default_branch
  },
)

export const getGitHubContentFile = async ({
  owner,
  repo,
  ref, // commit/branch/tag
  path,
}) => {
  ref = ref ?? (await getDefaultBranch({ owner, repo }))
  const encodedPath = path.split('/').map(encodeURIComponent).join('/')
  const { data: file } = await axios.get(
    `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(ref)}/${encodedPath}`,
  )
  return file
}

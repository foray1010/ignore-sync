import fg from 'fast-glob'
import path from 'path'

import cleanupIgnoreSyncFile from './cleanupIgnoreSyncFile.js'
import { LINE_BREAK } from './constants.js'

const decodeIgnoreSyncFile = (ignoreSyncFile) => {
  const normalizedIgnoreSyncFile = cleanupIgnoreSyncFile(ignoreSyncFile)

  return normalizedIgnoreSyncFile.split(LINE_BREAK).reduce((blocks, line) => {
    if (/^\[(.*)\]$/.test(line)) {
      return [
        ...blocks,
        {
          source: RegExp.$1,
          data: [],
        },
      ]
    }

    const lastBlock = blocks[blocks.length - 1]
    if (!lastBlock) {
      throw new Error('source `[]` not found before ignore pattern is found')
    }

    if (['local', 'relative'].includes(lastBlock.source)) {
      const pattern = path.posix.join('.', line)
      const files = fg.sync([pattern], {
        absolute: false,
        dot: true,
        onlyFiles: true,
      })
      return [
        ...blocks.slice(0, -1),
        {
          ...lastBlock,
          data: [...lastBlock.data, ...files],
        },
      ]
    }

    return [
      ...blocks.slice(0, -1),
      {
        ...lastBlock,
        data: [...lastBlock.data, line],
      },
    ]
  }, [])
}
export default decodeIgnoreSyncFile

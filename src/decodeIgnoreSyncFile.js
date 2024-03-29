import path from 'node:path'

import fg from 'fast-glob'

import cleanupIgnoreSyncFile from './cleanupIgnoreSyncFile.js'
import { LINE_BREAK } from './constants.js'

const decodeIgnoreSyncFile = (ignoreSyncFile) => {
  const normalizedIgnoreSyncFile = cleanupIgnoreSyncFile(ignoreSyncFile)

  return normalizedIgnoreSyncFile.split(LINE_BREAK).reduce((blocks, line) => {
    const sourceMatch = /^\[(.*)\]$/u.exec(line)
    if (sourceMatch) {
      return [
        ...blocks,
        {
          source: sourceMatch[1],
          data: [],
        },
      ]
    }

    const lastBlock = blocks.at(-1)
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

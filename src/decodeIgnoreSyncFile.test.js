'use strict'

const decodeIgnoreSyncFile = require('./decodeIgnoreSyncFile.js')

describe('decodeIgnoreSyncFile', () => {
  const currentDir = '.'

  test('should generate decoded result', () => {
    expect(
      decodeIgnoreSyncFile('[inline]\npattern\npattern2', currentDir),
    ).toEqual([{ source: 'inline', data: ['pattern', 'pattern2'] }])
  })

  test('support multiple sources', () => {
    expect(
      decodeIgnoreSyncFile(
        '[inline]\npattern\npattern2\n[inline]\npattern\npattern2',
        currentDir,
      ),
    ).toEqual([
      { source: 'inline', data: ['pattern', 'pattern2'] },
      { source: 'inline', data: ['pattern', 'pattern2'] },
    ])
  })

  test.each(['local', 'relative'])(
    'support glob in %s source tag',
    (source) => {
      expect(
        decodeIgnoreSyncFile(
          `[${source}]\n__fixtures__/test_glob*.txt`,
          currentDir,
        ),
      ).toEqual([
        {
          source,
          data: ['__fixtures__/test_glob1.txt', '__fixtures__/test_glob2.txt'],
        },
      ])

      // absolute path
      expect(
        decodeIgnoreSyncFile(
          `[${source}]\n/__fixtures__/test_glob*.txt`,
          currentDir,
        ),
      ).toEqual([
        {
          source,
          data: ['__fixtures__/test_glob1.txt', '__fixtures__/test_glob2.txt'],
        },
      ])

      expect(
        decodeIgnoreSyncFile(
          `[${source}]\n__fixtures__/*test_dotfile*.txt`,
          currentDir,
        ),
      ).toEqual([{ source, data: ['__fixtures__/.test_dotfile.txt'] }])

      expect(
        decodeIgnoreSyncFile(
          `[${source}]\n__fixtures__/test_nested/**`,
          currentDir,
        ),
      ).toEqual([
        {
          source,
          data: [
            '__fixtures__/test_nested/level1.txt',
            '__fixtures__/test_nested/nested/level2.txt',
          ],
        },
      ])
    },
  )

  test('should throw error if no source', () => {
    const error = new Error(
      'source `[]` not found before ignore pattern is found',
    )
    expect(() => decodeIgnoreSyncFile('pattern', currentDir)).toThrow(error)
    expect(() =>
      decodeIgnoreSyncFile('pattern\n[inline]\npattern', currentDir),
    ).toThrow(error)
    expect(() =>
      decodeIgnoreSyncFile(' [inline]\npattern', currentDir),
    ).toThrow(error)

    // allow empty source
    expect(() => decodeIgnoreSyncFile('[]\npattern', currentDir)).not.toThrow(
      error,
    )
    expect(() =>
      decodeIgnoreSyncFile('[inline]\npattern\n[]\npattern', currentDir),
    ).not.toThrow(error)
    expect(() =>
      decodeIgnoreSyncFile('[]\npattern\n[inline]\npattern', currentDir),
    ).not.toThrow(error)
    expect(() =>
      decodeIgnoreSyncFile('[inline] \npattern', currentDir),
    ).not.toThrow(error)
  })

  test('should ignore comments', () => {
    expect(
      decodeIgnoreSyncFile(
        '[inline] # comment\n# comment2\npattern\npattern2 # comment 3',
        currentDir,
      ),
    ).toEqual([{ source: 'inline', data: ['pattern', 'pattern2'] }])
  })
})

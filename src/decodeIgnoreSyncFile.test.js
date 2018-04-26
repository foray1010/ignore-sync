'use strict'

const decodeIgnoreSyncFile = require('./decodeIgnoreSyncFile')

describe('decodeIgnoreSyncFile', () => {
  test('should generate decoded result', () => {
    expect(decodeIgnoreSyncFile('[inline]\npattern\npattern2')).toEqual([
      {source: 'inline', data: ['pattern', 'pattern2']}
    ])
  })

  test('support multiple sources', () => {
    expect(
      decodeIgnoreSyncFile('[inline]\npattern\npattern2\n[inline]\npattern\npattern2')
    ).toEqual([
      {source: 'inline', data: ['pattern', 'pattern2']},
      {source: 'inline', data: ['pattern', 'pattern2']}
    ])
  })

  test('should throw error if no source', () => {
    const error = new Error('source `[]` not found before ignore pattern is found')
    expect(() => decodeIgnoreSyncFile('pattern')).toThrow(error)
    expect(() => decodeIgnoreSyncFile('pattern\n[inline]\npattern')).toThrow(error)
    expect(() => decodeIgnoreSyncFile(' [inline]\npattern')).toThrow(error)

    // allow empty source
    expect(() => decodeIgnoreSyncFile('[]\npattern')).not.toThrow(error)
    expect(() => decodeIgnoreSyncFile('[inline]\npattern\n[]\npattern')).not.toThrow(error)
    expect(() => decodeIgnoreSyncFile('[]\npattern\n[inline]\npattern')).not.toThrow(error)
    expect(() => decodeIgnoreSyncFile('[inline] \npattern')).not.toThrow(error)
  })

  test('should ignore comments', () => {
    expect(
      decodeIgnoreSyncFile('[inline] # comment\n# comment2\npattern\npattern2 # comment 3')
    ).toEqual([{source: 'inline', data: ['pattern', 'pattern2']}])
  })
})

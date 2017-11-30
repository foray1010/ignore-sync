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

  test('should ignore comments', () => {
    expect(
      decodeIgnoreSyncFile('[inline] # comment\n# comment2\npattern\npattern2 # comment 3')
    ).toEqual([{source: 'inline', data: ['pattern', 'pattern2']}])
  })

  test('should ignore spaces', () => {
    expect(decodeIgnoreSyncFile('   [   inline   ]   \n   pattern   \n   pattern2   \n\n')).toEqual(
      [{source: '   inline   ', data: ['pattern', 'pattern2']}]
    )
  })
})

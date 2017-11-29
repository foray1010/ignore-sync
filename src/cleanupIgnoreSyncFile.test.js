'use strict'

const cleanupIgnoreSyncFile = require('./cleanupIgnoreSyncFile')

describe('cleanupIgnoreSyncFile', () => {
  test('should remove comments', () => {
    expect(cleanupIgnoreSyncFile('pattern # comment')).toBe('pattern')
  })

  test('should remove empty lines', () => {
    expect(cleanupIgnoreSyncFile('\n\n\npat\n\n\ntern\n\n\n')).toBe('pat\ntern')
  })

  test('should trim spaces', () => {
    expect(cleanupIgnoreSyncFile('   p   a   t   t   e   r   n   ')).toBe('p a t t e r n')
  })
})

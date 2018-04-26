'use strict'

const cleanupIgnoreSyncFile = require('./cleanupIgnoreSyncFile')

describe('cleanupIgnoreSyncFile', () => {
  test('should remove comments', () => {
    expect(cleanupIgnoreSyncFile('pattern#')).toBe('pattern')
    expect(cleanupIgnoreSyncFile('pattern#comment')).toBe('pattern')
    expect(cleanupIgnoreSyncFile('pattern # comment')).toBe('pattern')
    expect(cleanupIgnoreSyncFile('pat#tern # comment')).toBe('pat')
  })

  test('should remove trailing spaces', () => {
    expect(cleanupIgnoreSyncFile('pattern ')).toBe('pattern')
    expect(cleanupIgnoreSyncFile('pattern   ')).toBe('pattern')
    expect(cleanupIgnoreSyncFile('pattern   #')).toBe('pattern')
  })

  test('should remove empty lines', () => {
    expect(cleanupIgnoreSyncFile('\n\n\npat\n\n\ntern\n\n\n')).toBe('pat\ntern')
  })
})

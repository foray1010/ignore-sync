import isIgnoreSyncFile from './isIgnoreSyncFile.js'

describe('isIgnoreSyncFile', () => {
  test('return true when filename end with .+ignore-sync', () => {
    expect(isIgnoreSyncFile('ignore-sync')).toBe(false)
    expect(isIgnoreSyncFile('.gitignore-sync')).toBe(true)
    expect(isIgnoreSyncFile('.gitignore-sync2')).toBe(false)
  })

  test('support relative path', () => {
    expect(isIgnoreSyncFile('./.gitignore-sync')).toBe(true)
    expect(isIgnoreSyncFile('../.gitignore-sync')).toBe(true)
    expect(isIgnoreSyncFile('repo/.gitignore-sync')).toBe(true)
  })

  test('support absolute path', () => {
    expect(isIgnoreSyncFile('/.gitignore-sync')).toBe(true)
    expect(isIgnoreSyncFile('/repo/.gitignore-sync')).toBe(true)
  })
})

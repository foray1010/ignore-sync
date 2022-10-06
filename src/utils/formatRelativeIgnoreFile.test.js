'use strict'

const formatRelativeIgnoreFile = require('./formatRelativeIgnoreFile')

describe('formatRelativeIgnoreFile', () => {
  const relativeDir = 'output'

  it('should ignore empty lines', () => {
    const input = '\n'.repeat(10)
    expect(formatRelativeIgnoreFile(input, relativeDir)).toBe(input)
  })

  it('should ignore empty spaces', () => {
    const input = ' \n'.repeat(10)
    expect(formatRelativeIgnoreFile(input, relativeDir)).toBe(input)
  })

  it('should ignore comments', () => {
    const input = '# comments\n'.repeat(10)
    expect(formatRelativeIgnoreFile(input, relativeDir)).toBe(input)
  })

  it('should prepend relative path with **', () => {
    expect(formatRelativeIgnoreFile('a', relativeDir)).toBe('output/**/a')
    expect(formatRelativeIgnoreFile('a/', relativeDir)).toBe('output/**/a/')

    expect(formatRelativeIgnoreFile('!a', relativeDir)).toBe('!output/**/a')
    expect(formatRelativeIgnoreFile('!a/', relativeDir)).toBe('!output/**/a/')
  })

  it('should not prepend relative path with ** if already starts with **', () => {
    expect(formatRelativeIgnoreFile('**/a', relativeDir)).toBe('output/**/a')
    expect(formatRelativeIgnoreFile('/**/a', relativeDir)).toBe('output/**/a')

    expect(formatRelativeIgnoreFile('!**/a', relativeDir)).toBe('!output/**/a')
    expect(formatRelativeIgnoreFile('!/**/a', relativeDir)).toBe('!output/**/a')
  })

  it('should prepend relative path without **', () => {
    expect(formatRelativeIgnoreFile('/a', relativeDir)).toBe('output/a')
    expect(formatRelativeIgnoreFile('/a/', relativeDir)).toBe('output/a/')
    expect(formatRelativeIgnoreFile('a/b', relativeDir)).toBe('output/a/b')
    expect(formatRelativeIgnoreFile('a/**', relativeDir)).toBe('output/a/**')
    expect(formatRelativeIgnoreFile('a//', relativeDir)).toBe('output/a//')

    expect(formatRelativeIgnoreFile('!/a', relativeDir)).toBe('!output/a')
    expect(formatRelativeIgnoreFile('!/a/', relativeDir)).toBe('!output/a/')
    expect(formatRelativeIgnoreFile('!a/b', relativeDir)).toBe('!output/a/b')
    expect(formatRelativeIgnoreFile('!a/**', relativeDir)).toBe('!output/a/**')
    expect(formatRelativeIgnoreFile('!a//', relativeDir)).toBe('!output/a//')
  })
})

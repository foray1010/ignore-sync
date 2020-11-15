'use strict'

const formatRelativeIgnoreFile = require('../formatRelativeIgnoreFile')

describe('formatRelativeIgnoreFile', () => {
  const relativeDir = 'output'

  it('should ignore empty lines', () => {
    const input = '\n'.repeat(10)
    expect(formatRelativeIgnoreFile(input, relativeDir)).toBe(input)
  })

  it('should ignore comments', () => {
    const input = '# comments\n'.repeat(10)
    expect(formatRelativeIgnoreFile(input, relativeDir)).toBe(input)
  })
})

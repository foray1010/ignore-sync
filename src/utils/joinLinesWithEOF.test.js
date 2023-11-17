import joinLinesWithEOF from './joinLinesWithEOF.js'

describe('joinLinesWithEOF', () => {
  test('should join lines with EOF', () => {
    expect(joinLinesWithEOF(['a', 'b'])).toBe('a\nb\n')
  })

  test('should ensure only one line break at the end of string', () => {
    expect(joinLinesWithEOF(['a'])).toBe('a\n')
    expect(joinLinesWithEOF(['a\n\n'])).toBe('a\n')
    expect(joinLinesWithEOF(['a\n', '\n'])).toBe('a\n')
    expect(joinLinesWithEOF(['a', '\n\n'])).toBe('a\n')

    // should not affect inner lines
    expect(joinLinesWithEOF(['a\n\n', 'b\n\n'])).toBe('a\n\n\nb\n')
  })

  test(
    // eslint-disable-next-line jest/valid-title
    String.raw`should keep \r\n in the end of file for ignoring mac icon\r\n`,
    () => {
      expect(joinLinesWithEOF(['a\r\n'])).toBe('a\r\n')
    },
  )

  test('should accept empty array', () => {
    expect(joinLinesWithEOF([])).toBe('\n')
  })
})

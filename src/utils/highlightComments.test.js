'use strict'

const highlightComments = require('./highlightComments')

describe('highlightComments', () => {
  test('should add # correctly', () => {
    expect(highlightComments('a')).toBe(
      `
#####
# a #
#####
      `.trim()
    )

    expect(highlightComments('a\nbc')).toBe(
      `
######
# a  #
# bc #
######
      `.trim()
    )

    expect(highlightComments('ab\ncd')).toBe(
      `
######
# ab #
# cd #
######
      `.trim()
    )

    expect(highlightComments('a\nbc\ndef')).toBe(
      `
#######
# a   #
# bc  #
# def #
#######
      `.trim()
    )
  })

  test('should accept empty string', () => {
    expect(highlightComments('')).toBe('')
  })
})

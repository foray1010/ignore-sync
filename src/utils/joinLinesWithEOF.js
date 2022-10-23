import * as R from 'ramda'

import { LINE_BREAK } from '../constants.js'

const joinLinesWithEOF = R.compose(
  R.replace(RegExp(LINE_BREAK + '*$'), LINE_BREAK),
  R.join(LINE_BREAK),
)
export default joinLinesWithEOF

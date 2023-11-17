import * as R from 'ramda'

import { LINE_BREAK } from '../constants.js'

const joinLinesWithEOF = R.compose(
  R.replace(new RegExp(LINE_BREAK + '*$', 'u'), LINE_BREAK),
  R.join(LINE_BREAK),
)
export default joinLinesWithEOF

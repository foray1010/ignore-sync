import path from 'node:path'

import * as R from 'ramda'

const isIgnoreSyncFile = R.compose(R.test(/.+ignore-sync$/), path.basename)
export default isIgnoreSyncFile

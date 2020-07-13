'use strict'

module.exports = {
  '*.{json,yaml,yml}': 'yarn prettier --write',
  '*.js': [
    'yarn prettier --write',
    'yarn eslint --fix',
    'jest --bail --findRelatedTests --config .jestrc.json',
  ],
  '*.md': (filenames) => {
    return [`yarn prettier --write ${filenames.join(' ')}`, 'yarn remark .']
  },
  '*.mmd': 'yarn mermaid',
}

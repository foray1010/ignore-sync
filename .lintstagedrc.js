'use strict'

module.exports = {
  '*.{cjs,cts,js,mjs,mts,ts,tsx}': [
    'yarn prettier --write',
    'yarn eslint --fix',
    'jest --bail --findRelatedTests',
  ],
  '*.{json,markdown,md,yaml,yml}': 'yarn prettier --write',
  '*.mmd': 'yarn mermaid',
}

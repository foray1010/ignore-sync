const config = {
  '*.{cjs,cts,js,mjs,mts,ts,tsx}': [
    'yarn prettier --write',
    'yarn eslint --fix',
    'yarn jest --bail --findRelatedTests --passWithNoTests',
  ],
  '*.{json,yaml,yml}': 'yarn prettier --write',
  '*.{markdown,md}': ['yarn prettier --write', 'yarn remark'],
  '*.mmd': 'yarn mermaid',
}
export default config

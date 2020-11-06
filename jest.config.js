'use strict'

const config = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{cjs,js,mjs,ts,tsx}'],
  coverageReporters: ['lcov', 'text-summary'],
  testMatch: ['**/*.{spec,test}.{cjs,js,mjs,ts,tsx}'],
}

module.exports = config

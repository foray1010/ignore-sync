'use strict'

const config = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{cjs,cts,js,mjs,mts,ts,tsx}'],
  coverageReporters: ['lcov', 'text-summary'],
  testEnvironment: 'node',
  testMatch: ['**/*.{spec,test}.{cjs,cts,js,mjs,mts,ts,tsx}'],
}

module.exports = config

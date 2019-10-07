#!/usr/bin/env node

'use strict'

const app = require('./app')

const cwd = process.cwd()
const paths = process.argv.slice(2)

app(cwd, paths).catch(err => {
  console.error(err.stack)
})

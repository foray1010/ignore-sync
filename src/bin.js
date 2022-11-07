#!/usr/bin/env node

import process from 'node:process'

import app from './app.js'

const cwd = process.cwd()
const paths = process.argv.slice(2)

app(cwd, paths).catch((err) => {
  console.error(err.stack)
})

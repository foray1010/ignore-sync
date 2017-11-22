#!/usr/bin/env node

'use strict'

const app = require('./app')

app().catch((err) => {
  console.error(err.stack)
})

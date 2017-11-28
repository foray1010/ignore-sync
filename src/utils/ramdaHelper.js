'use strict'

const R = require('ramda')

const composeAndPromiseAll = (...args) => R.compose(R.bind(Promise.all, Promise), ...args)
exports.composeAndPromiseAll = composeAndPromiseAll

// can compose sync and async functions
const dynamicComposeP = (...args) => R.composeP(...args, R.bind(Promise.resolve, Promise))
exports.dynamicComposeP = dynamicComposeP

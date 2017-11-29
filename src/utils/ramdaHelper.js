'use strict'

const R = require('ramda')

// can compose sync and async functions
const dynamicComposeP = (...args) => R.composeP(...args, R.bind(Promise.resolve, Promise))
exports.dynamicComposeP = dynamicComposeP

const promiseMap = R.curry((fn, array) => R.compose(R.bind(Promise.all, Promise), R.map(fn))(array))
exports.promiseMap = promiseMap

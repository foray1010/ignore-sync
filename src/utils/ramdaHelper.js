'use strict'

const R = require('ramda')

const composeAndPromiseAll = (...args) => R.compose(R.bind(Promise.all, Promise), ...args)
exports.composeAndPromiseAll = composeAndPromiseAll

const syncToAsync = (fn) => (...args) => Promise.resolve(fn(...args))
exports.syncToAsync = syncToAsync

'use strict'

const R = require('ramda')

const composeAndPromiseAll = (...args) => R.compose(R.bind(Promise.all, Promise), ...args)
exports.composeAndPromiseAll = composeAndPromiseAll

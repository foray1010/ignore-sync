import * as R from 'ramda'

// can compose sync and async functions
export const dynamicComposeP = (...args) =>
  R.composeWith(R.andThen)([...args, R.bind(Promise.resolve, Promise)])

export const promiseMap = R.curry((fn, array) => Promise.all(R.map(fn, array)))

export const promiseFilter = R.curry(async (fn, array) => {
  const mapped = await promiseMap(fn, array)
  return array.filter((x, index) => mapped[index])
})

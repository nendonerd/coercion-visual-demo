const cases = require('./testcases.js')

const coerceCompare = require('./coercion.js') //?

let failures = cases.filter(c => {
  let [a, b] = c.split(" == ")
  a = eval(a)
  b = eval(b)
  return eval(c) !== coerceCompare(a, b)
})

failures //?


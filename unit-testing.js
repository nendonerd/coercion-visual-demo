let cases = [
  "[] == []",
  "({}) == ({})",
  "({}) == !({})",
  "({}) == false",
  "'[object Object]' == 0",
  "NaN == 0",
  "[] == ({})",
  "[] == 0",
  "[2] == 2",
  "['0'] == false",
  "'0' == false",
  "[] == false",
  "[null] == false",
  "null == false",
  "[undefined] == false",
  "undefined == false",
  "null == undefined",
  "null == null",
  "undefined == undefined",
  "NaN == NaN",
  "NaN == undefined",
  "NaN == null",
  "undefined == null",
  "undefined == 'undefined'",
  "null == 'null'",
  "'' == !''",
  "[] == [null]",
  "[] == [undefined]",
  "[] == ''",
  "[] == 0",
  "[null] == [undefined]",
  "[null] == ''",
  "[null] == 0",
  "[undefined] == ''",
  "[undefined] == 0",
  "'' == 0"
]

const coerceCompare = require('./coercion.js') //?

let failures = cases.filter(c => {
  let [a, b] = c.split(" == ")
  a = eval(a)
  b = eval(b)
  return eval(c) !== coerceCompare(a, b)
})

failures //?


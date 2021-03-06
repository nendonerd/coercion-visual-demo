module.exports = [
  "[] == []",
  "({}) == ({})",
  "({}) == !({})",
  "({}) == false",
  "'[object Object]' == 0",
  "NaN == 0",
  "[] == {}",
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
  "[] == [null] == [undefined] == '' == 0",
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

JSON.stringify(NaN) //?
isNaN(NaN) //?
// return isNaN(x) ? NaN : JSON.stringify(x)
isNaN({}) //?
Number.isNaN({}) //?

let arr = ['a']
arr.includes('a') //?
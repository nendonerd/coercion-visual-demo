// rules are according to:
// https://www.ecma-international.org/ecma-262/9.0/index.html#sec-abstract-equality-comparison
/*
The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:

1. If Type(x) is the same as Type(y), then return the result of performing Strict Equality Comparison x === y.
2. If x is null and y is undefined, return true.
3. If x is undefined and y is null, return true.
4. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ! ToNumber(y).
5. If Type(x) is String and Type(y) is Number, return the result of the comparison ! ToNumber(x) == y.
6. If Type(x) is Boolean, return the result of the comparison ! ToNumber(x) == y.
7. If Type(y) is Boolean, return the result of the comparison x == ! ToNumber(y).
8. If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).
9. If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x) == y.
10. Return false.

*/

function coerceCompare(a, b) {
  let typeA = Type(a) //?
  let typeB = Type(b) //?
  let types = new Set([typeA, typeB])
  let data = { a, b }

  // render(data)//?

  // rule_1
  if (types.size === 1) {
    render(data, String(a === b)) //?
    return a === b
  }

  //rule_6_7
  if (types.has('Boolean')) {
    let boo = find(data, 'Boolean')
    data[boo] = Number(data[boo])
    render(data) //?
    coerceCompare(data.a, data.b)
  }

  // rule_4_5
  if (types.has('String') && types.has('Number')) {
    let str = find(data, 'String')
    data[str] = Number(data[str])
    render(data) //?
    coerceCompare(data.a, data.b)
  }

  // rule_8_9
  if (types.has('Object')) {
    let obj = find(data, 'Object') //?
    data[obj] = ToPrimitive(data[obj])
    render(data) //?
    coerceCompare(data.a, data.b)
  }

  // rule_2_3
  if (types.has('Undefined') && types.has('Null')) {
    render(data, 'true') //?
    return true
  }

  // edge case, for comparing undefined/null with other stuff
  if (types.has('Undefined') || types.has('Null')) {
    render(data, 'false') //?
    return false
  }

  return coerceCompare(data.a, data.b)
}

function find({ a, b }, type) {
  if (Type(a) === type) { return 'a' }
  else { return 'b' }
}

function ToPrimitive(x) {
  if (Type(x.toString()) !== 'Array' && Type(x.toString()) !== 'Object') {
    return x.toString()
  } else if (Type(x.valueOf()) !== 'Array' && Type(x.valueOf()) !== 'Object') {
    return x.valueOf()
  } else {
    return undefined
  }
}

function Type(x) {
  let loosyType = typeof x
  let strictType = (() => {
    let type = Object.prototype.toString.call(x)
    return type.substring(8, type.length - 1)
  })()

  if(loosyType === 'object' && strictType !== 'Null') {
    return 'Object'
  } else {
    return strictType
  }
}

const render = (() => {
  if (location.href !== 'about:blank') { // for quokka compatibility
    return renderInBrowser
  } else {
    return renderInNode
  }
})()

// ENV: Node
function renderInNode({a, b}, end) {
  let typeA = Type(a) //?
  let typeB = Type(b)
  if (end !== undefined) {
    return String(end) //?
  } else {
    return ('a: '+ a + typeA + ' | ' + 'b: ' +b+ typeB)
  }
}

// ENV: Browser
function renderInBrowser({a, b}, end) {

  let typeA = Type(a) //?
  let typeB = Type(b)
  let msg

  if (end !== undefined) {
    msg = String(end)
  } else {
    msg = ('a: ' + typeA + ' | ' + 'b: ' + typeB)
  }

  let result = document.querySelector('.result')

  let step = document.createElement('li')
  step.textContent = msg

  result.append(step)

}


coerceCompare(true, 1) //?

// Number(true)//?
// String(true) //?
// location.href //?
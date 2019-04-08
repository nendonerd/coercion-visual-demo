// rules are according to:
// https://www.ecma-international.org/ecma-262/9.0/index.html#sec-abstract-equality-comparison

// The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:
const RULES = [
  "1. If Type(x) is the same as Type(y), then return the result of performing Strict Equality Comparison x === y.",
  "2. If x is null and y is undefined, return true.",
  "3. If x is undefined and y is null, return true.",
  "4. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ! ToNumber(y).",
  "5. If Type(x) is String and Type(y) is Number, return the result of the comparison ! ToNumber(x) == y.",
  "6. If Type(x) is Boolean, return the result of the comparison ! ToNumber(x) == y.",
  "7. If Type(y) is Boolean, return the result of the comparison x == ! ToNumber(y).",
  "8. If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).",
  "9. If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x) == y.",
  "10. Return false."
]


function coerceCompare(x, y) {
  let typeX = typeOf(x) //?
  let typeY = typeOf(y) //?
  let set = new Set([typeX, typeY])
  let data = {x, y}

  if (set.size === 1) { // rule_1
    let res = (x === y)
    render(data, String(res), [1])
    return res
  }

  if (set.has('Boolean')) { // rule_6_7
    let boo = find(data, 'Boolean')
    data[boo] = Number(data[boo])
    boo === 'x' ? render(data, null, [6]) : render(data, null, [7])
  }

  if (set.has('String') && set.has('Number')) { // rule_4_5
    let str = find(data, 'String')
    data[str] = Number(data[str])
    str === 'x' ? render(data, null, [5]) : render(data, null, [4])
  }

  if (set.has('Object')) { //rule_8_9
    let obj = find(data, 'Object')
    data[obj] = toPrimitive(data[obj])
    obj === 'x' ? render(data, null, [9]) : render(data, null, [8])
    // render(data, null, [8, 9])
  }

  if (set.has('Undefined') && set.has('Null')) { // rule_2_3
    let _null = find(data, 'Null')
    _null === 'x' ? render(data, 'true', [2]) : render(data, 'true', [3])
    return true
  }

  if (set.has('Undefined') || set.has('Null')) { // rule_10
    render(data, 'false', [10])
    return false
  }

  return coerceCompare(data.x, data.y)
}

function find({x, y}, type) {
  if (typeOf(x) === type) {return 'x'}
  else {return 'y'}
}


function toPrimitive(x) {
  if (typeOf(x.toString()) !== 'Array' && typeOf(x.toString()) !== 'Object') {
    return x.toString()
  } else if (typeOf(x.valueOf()) !== 'Array' && typeOf(x.valueOf()) !== 'Object'){
    return x.valueOf()
  } else {
    return undefined
  }
}


function typeOf(x) { // a reliable version of typeof, which only returns 6 primitive types + 1 object type
  const PrimitiveTypes = ['String', 'Number', 'Boolean', 'Null', 'Undefined', 'Symbol']
  let typeStr = Object.prototype.toString.call(x)
  let type = typeStr.substring(8, typeStr.length-1)
  if (!PrimitiveTypes.includes(type)) { type = 'Object' }
  return type
}

function typeOf_render(x) { // a loosy version of typeof, will reveal object sub types
  let typeStr = Object.prototype.toString.call(x)
  let type = typeStr.substring(8, typeStr.length - 1)
  return type
}

const render = (() => {
  if (!window || location.href !== 'about:blank') { // for quokka compatibility
    return renderInBrowser
  } else {
    return renderInNode
  }
})()

// ENV: Browser
let stepCache
/**
 * data: [a, b]
 * res: "str"
 * tips: [num1, num2, ...]
 */
function renderInBrowser(data, res, tips) {

  let msg

  if (res) {
    msg = String(res)
  } else {
    let valX = Number.isNaN(data.x) ? NaN : JSON.stringify(data.x)
    let valY = Number.isNaN(data.y) ? NaN : JSON.stringify(data.y)
    let typeX = typeOf_render(data.x)
    let typeY = typeOf_render(data.y)
    msg = [(`${valX}: ${typeX}`), (`${valY}: ${typeY}`)]
  }

  let result = document.querySelector('.result')
  let step = document.createElement('tr')

  if (typeof msg !== 'string') {

    let td0 = document.createElement('td') // for preserving spaces
    let td1 = document.createElement('td')

    td0.textContent = msg[0]
    td1.textContent = msg[1]

    step.append(td0)
    step.append(td1)

  } else {
    let td = document.createElement('td')
    td.textContent = msg
    td.colSpan="2"
    step.append(td)
    msg === 'true' ? step.classList.add('true') : step.classList.add('false')
  }

  if (tips && stepCache) {

    let tipBox = document.createElement('div')
    tipBox.classList.add('tipBox')
    tipBox.innerText = tips.reduce((sum, tip) => sum += RULES[tip - 1] + "\n", "")
    tipBox.hidden = true

    stepCache.append(tipBox)
    stepCache.addEventListener('mouseover', () => tipBox.hidden = false)
    stepCache.addEventListener('mouseout', () => tipBox.hidden = true)
  }

  stepCache = step

  result.append(step)

}

// ENV: Node
function renderInNode({ x, y }, res) {
  let typeX = typeOf_render(x) //?
  let typeY = typeOf_render(y)
  if (res !== undefined) {
    return String(res) //?
  } else {
    return ('x: ' + x + typeX + ' | ' + 'y: ' + y + typeY)
  }
}

try {module.exports = coerceCompare}
catch(e) {}
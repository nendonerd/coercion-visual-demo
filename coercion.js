function coerceCompare(a, b) {
  let typeA = typeOf(a) //?
  let typeB = typeOf(b) //?
  let set = new Set([typeA, typeB])
  let data = {a: a, b: b}

  if (set.size === 1) {return a === b}
  if (set.has('Array') && set.has('Object')) {
    render(data, String(a === b))
    return a === b
  }

  if (set.has('Boolean')) {
    let boo = find(data, 'Boolean')
    data[boo] = Number(data[boo])
    render(data)
  }
  if (set.has('String') && set.has('Number')) {
    let str = find(data, 'String')
    data[str] = Number(data[str])
    render(data)
  }
  if (set.has('Array')) {
    let arr = find(data, 'Array')
    data[arr] = toPrimitive(data[arr])
    render(data)
  }
  if (set.has('Object')) {
    let obj = find(data, 'Object')
    data[obj] = toPrimitive(data[obj])
    render(data)
  }
  if (set.has('Undefined') && set.has('Null')) {
    render(data, 'true')
    return true
  }
  if (set.has('Undefined') || set.has('Null')) {
    render(data, 'false')
    return false
  }

  a = data.a
  b = data.b

  return coerceCompare(a, b)
}

function find({a, b}, type) {
  if (typeOf(a) === type) {return 'a'}
  else {return 'b'}
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

function typeOf(x) {
  let type = Object.prototype.toString.call(x)
  return type.substring(8, type.length-1)
}


const render = (() => {
  if (location.href !== 'about:blank') { // for quokka compatibility
    return renderInBrowser
  } else {
    return renderInNode
  }
})()

// ENV: Node
function renderInNode({ a, b }, end) {
  let typeA = typeOf(a) //?
  let typeB = typeOf(b)
  if (end !== undefined) {
    return String(end) //?
  } else {
    return ('a: ' + a + typeA + ' | ' + 'b: ' + b + typeB)
  }
}

// ENV: Browser
function renderInBrowser(data, end) {

  let msg

  if (end !== undefined) {
    msg = String(end)
  } else {
    let typeA = typeOf(data.a)
    let typeB = typeOf(data.b)
    msg = [(`${JSON.stringify(data.a)}: ${typeA}`), (`${JSON.stringify(data.b)}: ${typeB}`)]
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
  }

  result.append(step)

}


if (module) {module.exports = coerceCompare}
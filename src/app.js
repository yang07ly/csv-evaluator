const fs = require('fs')
const math = require('mathjs')
const readline = require('readline')
const firstline = require('firstline')

const MAP_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K']
const OPS = ['*', '/', '+', '-', '(', ')']

const main = (input, output) => {
  return firstline(input).then(header => {
    validateHeader(header.trim())
    const map = processHeader(header.trim())
    const rl = readline.createInterface({
      input: fs.createReadStream(input),
      output: fs.createWriteStream(output)
    })
    let i = 0
    return new Promise((resolve, reject) => {
      rl.on('line', line => {
        try {
          if (i === 0) {
            rl.output.write(line.trim())
          } else {
            validateBody(line.trim())
            const result = evalByLine(line.trim(), map)
            rl.output.write('\n' + result)
          }
          i++
        } catch (err) {
          console.log(err)
          reject(err)
          rl.close()
          rl.removeAllListeners()
        }
      }).on('close', () => {
        resolve(input + ' processed successfully.\n' +
          'Saved to ' + output)
      })
    })
  }).then(data =>
    console.log(data)
  )
}

const validateHeader = data => {
  if (data === undefined || data === null || data.length === 0) {
    throw Error('Given file is empty.')
  }
  const headers = data.split(/\t|,/)
  if (headers.length !== 11) {
    throw Error('Length of columns must be exactly 11.')
  }
  for (let i = 0; i < headers.length; i++) {
    if (isNaN(Number(headers[i]))) {
      throw Error('All values in the header must be numbers:',
        headers[i])
    }
  }
}

const validateBody = data => {
  if (data === undefined || data === null || data.length === 0) {
    throw Error('Empty row.')
  }
  const exps = data.split(/\t|,/)
  if (exps.length !== 11) {
    throw Error('Length of columns must be exactly 11.')
  }
  for (let j = 0; j < exps.length; j++) {
    const exp = exps[j]
    for (let k = 0; k < exp.length; k++) {
      const char = exp[k]
      if (char !== ' ') {
        if (!MAP_LETTERS.includes(char) && !OPS.includes(char)) {
          throw Error('Invalid character found: ' + char)
        }
      }
    }
  }
}

const processHeader = data => {
  const headers = data.split(/\t|,/)
  const map = {}
  for (let i = 0; i < headers.length; i++) {
    map[MAP_LETTERS[i]] = headers[i]
  }
  return map
}

const evalByLine = (data, map) => {
  if (!map) {
    throw Error('Internal server error.')
  }
  const exps = data.split(/\t|,/)
  const result = []
  exps.map(exp =>
    result.push(math.evaluate(exp, map))
  )
  return result.join(',')
}

module.exports = {
  main
}

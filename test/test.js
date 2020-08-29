const assert = require('assert')
const app = require('../src/app.js')
const fs = require('fs')

beforeEach(async () => {
  for (let i = 1; i <= 9; i++) {
    await fs.unlink('test/testcase' + i + '/output.csv',
      err => undefined)
  }
})

describe('CSV Evaluator', () => {
  it('1. Success story - Common.', async () => {
    const inputPath = 'test/testcase1/input.csv'
    const outputPath = 'test/testcase1/output.csv'
    const outputExpectedPath = 'test/testcase1/output_expected.csv'
    await app.main(inputPath, outputPath)

    const outputActual = await fs.promises.readFile(outputPath, 'utf8')
    const outputExpect = await fs.promises.readFile(outputExpectedPath, 'utf8')
    assert.strictEqual(outputActual, outputExpect)
  })

  it('2. Success story - Multiplication and division by 0.', async () => {
    const inputPath = 'test/testcase2/input.csv'
    const outputPath = 'test/testcase2/output.csv'
    const outputExpectedPath = 'test/testcase2/output_expected.csv'
    await app.main(inputPath, outputPath)

    const outputActual = await fs.promises.readFile(outputPath, 'utf8')
    const outputExpect = await fs.promises.readFile(outputExpectedPath, 'utf8')
    assert.strictEqual(outputActual, outputExpect)
  })

  it('3. Success story - Edge case, only header row.', async () => {
    const inputPath = 'test/testcase3/input.csv'
    const outputPath = 'test/testcase3/output.csv'
    const outputExpectedPath = 'test/testcase3/output_expected.csv'
    await app.main(inputPath, outputPath)

    const outputActual = await fs.promises.readFile(outputPath, 'utf8')
    const outputExpect = await fs.promises.readFile(outputExpectedPath, 'utf8')
    assert.strictEqual(outputActual, outputExpect)
  })

  it('4. Error detection - Random text file.', async () => {
    const inputPath = 'test/testcase4/input.csv'
    const outputPath = 'test/testcase4/output.csv'
    app.main(inputPath, outputPath).catch(err => {
      assert.strictEqual(
        err.message,
        'Length of columns must be exactly 11.'
      )
    })
  })

  it('5. Error detection - Empty text file.', async () => {
    const inputPath = 'test/testcase5/input.csv'
    const outputPath = 'test/testcase5/output.csv'
    app.main(inputPath, outputPath).catch(err => {
      assert.strictEqual(
        err.message,
        'Given file is empty.'
      )
    })
  })

  it('6. Error detection - Character not in A-K : Z.', async () => {
    const inputPath = 'test/testcase6/input.csv'
    const outputPath = 'test/testcase6/output.csv'
    app.main(inputPath, outputPath).catch(err => {
      assert.strictEqual(
        err.message,
        'Invalid character found: Z'
      )
    })
  })

  it('7. Error detection - Character not in A-K: 1.', async () => {
    const inputPath = 'test/testcase7/input.csv'
    const outputPath = 'test/testcase7/output.csv'
    app.main(inputPath, outputPath).catch(err => {
      assert.strictEqual(
        err.message,
        'Invalid character found: 1'
      )
    })
  })

  it('8. Error detection - Invalid math operation %.', async () => {
    const inputPath = 'test/testcase8/input.csv'
    const outputPath = 'test/testcase8/output.csv'
    app.main(inputPath, outputPath).catch(err => {
      assert.strictEqual(
        err.message,
        'Invalid character found: %'
      )
    })
  })

  // it('9. Large dataset - 1 million rows.', async () => {
  //   const inputPath = 'test/testcase9/input.csv'
  //   const outputPath = 'test/testcase9/output.csv'
  //   await app.main(inputPath, outputPath)
  // })
})

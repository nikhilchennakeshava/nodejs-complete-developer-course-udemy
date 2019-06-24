const { calculateTip, cToF, fToC, add } = require('../src/math')

test('Should calculate total with tip', () => {

    expect(calculateTip(10, .3)).toBe(13)

    // // not feasible
    // const total = calculateTip(10, .3)

    // if (total !== 13) {
    //     throw new Error(`Total tip should be 13. Got ${total}`)
    // }
})

test('Should calculate total with default tip', () => {
    expect(calculateTip(10)).toBe(12)
})

test('Should convert 32F to 0C', () => {
    expect(fToC(32)).toBe(0)
})

test('Should convert 0C to 32F', () => {
    expect(cToF(0)).toBe(32)
})

// Callback way of testing
test('Async test demo', (done) => {
    setTimeout(() => {
        expect(2).toBe(2)
        done()
    }, 2000)

    // expect(1).toBe(2)
})

// Promises way of testing
test('Async Promises Add 2 numbers', (done) => {
    add(2, 3).then(sum => {
        expect(sum).toBe(5)
        done()
    })
})

// Async/await way of testing
test('Async Async/await Add 2 numbers', async() => {
    // const sum = await add(2, 3)
    // expect(sum).toBe(5)

    // const sum = await add(2, 3)
    expect(await add(2, 3)).toBe(5)
})

// test('Init testing framework - Success - Jest', () => {

// })

// test('Init testing framework - Failure - Jest', () => {
//     throw new Error('Failure')
// })
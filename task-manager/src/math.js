// const calculateTip = (total, tipPercent) => {
//     const tip = total * tipPercent
//     return total + tip
// }

const calculateTip = (total, tipPercent = .2) => total + total * tipPercent

const cToF = temp => temp * 1.8 + 32

const fToC = temp => (temp - 32) / 1.8

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Only positive numbers')
            }
            resolve(a + b)
        }, 2000)
    })
}

module.exports = {
    calculateTip,
    cToF,
    fToC,
    add
}
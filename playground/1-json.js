const fs = require('fs')

const bookObject = {
    title: 'Cut it short',
    author: 'Nikhil'
}

const bookJson = JSON.stringify(bookObject)
console.log(bookJson)

const parsedBookJson = JSON.parse(bookJson)
console.log(parsedBookJson)

fs.writeFileSync('1-json.json', bookJson)

const dataBuffer = fs.readFileSync('1-json.json')
const dataJson = dataBuffer.toString()
const data = JSON.parse(dataJson)
console.log(data)
const name = 'Nikhil'
const age = 24

// Object shorthand syntax
const user = {
    name,
    age,
    location: 'Bangalore'
}

// Object destructuring
const product = {
    label: 'Notebook',
    price: 3,
    stock: 200
}

// const { label, price } = product

const { label: productName, price, rating = 5 } = product

// const transaction = (type, { label, stock }) => {
//     console.log(type, label, stock)
// }

// transaction with default values
const transaction = (type, { label = 'Prod', stock = 0 } = {}) => {
    console.log(type, label, stock)
}
transaction('order', product)
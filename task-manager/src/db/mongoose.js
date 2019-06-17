const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// const user = new User({
//     name: 'Nikhil',
//     age: 24
// })

// user.save().then((result) => {
//     console.log('Result:', result)
// }).catch((error) => {
//     console.log('Error:', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Mongoose library',
    completed: false
})

task.save().then((result) => {
    console.log('Result:', result)
}).catch((error) => {
    console.log('Error:', error)
})
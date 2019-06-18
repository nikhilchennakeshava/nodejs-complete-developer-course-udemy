const express = require('express')
require('./db/mongoose')
const { User } = require('./models/user')
const { Task } = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// Telling express to parse incoming requests as JSON.
app.use(express.json())

// Create User
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then((result) => {
        res.status(201).send(result)
    }).catch((e) => {
        res.status(400).send(e)
            // res.send(e)
    })
})

// Get all Users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Get a specific User
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Get all Tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Get a specific Task
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Create Task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then((result) => {
        res.status(201).send(result)
    }).catch((e) => {
        res.status(400).send(e)
            // res.send(e)
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
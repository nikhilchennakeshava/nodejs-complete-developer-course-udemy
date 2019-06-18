const express = require('express')
require('./db/mongoose')
const { User } = require('./models/user')
const { Task } = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// Telling express to parse incoming requests as JSON.
app.use(express.json())

// Create User
app.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        const result = await user.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }

    // user.save().then((result) => {
    //     res.status(201).send(result)
    // }).catch((e) => {
    //     res.status(400).send(e)
    //         // res.send(e)
    // })
})

// Get all Users
app.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// Get a specific User
app.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// Get all Tasks
app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// Get a specific Task
app.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// Create Task
app.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        const result = await task.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then((result) => {
    //     res.status(201).send(result)
    // }).catch((e) => {
    //     res.status(400).send(e)
    //         // res.send(e)
    // })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
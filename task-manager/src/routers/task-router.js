const express = require('express')
const { Task } = require('../models/task')
const { auth } = require('../middleware/auth')

const router = new express.Router()

// Create Task
router.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=5
// GET /tasks?sortBy=createdAt:asc
// Get all Tasks
router.get('/tasks', auth, async(req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')

        // setting sort option dynamically with ternary operator
        sort[parts[0]] = parts[1] === 'dsc' ? -1 : 1
    }

    try {
        // // original
        // const tasks = await Task.find({})

        // // method 1 
        // const tasks = await Task.find({owner: req.user._id})
        // res.send(tasks)

        // method 2
        const tasks = await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     createdAt: -1
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)
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
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

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

// Update Task
router.patch('/tasks/:id', auth, async(req, res) => {
    // check if user tries to update non-updatable fields.
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        // // To make the middleware work
        // const task = await Task.findById(req.params.id)

        // get task
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        // No task to update
        if (!task) {
            return res.status(404).send()
        }

        // Using bracket notation as we want to use dynamically
        updates.forEach(update => task[update] = req.body[update])
        const updatedTask = await task.save()

        // // to make middle ware work
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // // No task to update
        // if (!task) {
        //     return res.status(404).send()
        // }

        // Updated successfully
        res.send(updatedTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete Task
router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        // No task to delete
        if (!task) {
            return res.status(404).send()
        }

        // Deleted successfully
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = {
    router
}
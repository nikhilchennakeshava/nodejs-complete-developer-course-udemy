const express = require('express')
const { Task } = require('../models/task')

const router = new express.Router()

// Create Task
router.post('/tasks', async(req, res) => {
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

// Get all Tasks
router.get('/tasks', async(req, res) => {
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
router.get('/tasks/:id', async(req, res) => {
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

// Update Task
router.patch('/tasks/:id', async(req, res) => {
    // check if user tries to update non-updatable fields.
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        // To make the middleware work
        const task = await Task.findById(req.params.id)

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
router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

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
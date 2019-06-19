const express = require('express')
const { User } = require('../models/user')

const router = new express.Router()

// // Set up routes
// router.get('/test', (req, res) => {
//     console.log('From second router')
// })

// Create User
router.post('/users', async(req, res) => {
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

// User login
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get all Users
router.get('/users', async(req, res) => {
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
router.get('/users/:id', async(req, res) => {
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

// Update User
router.patch('/users/:id', async(req, res) => {
    // check if user tries to update non-updatable fields.
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        // To make the middleware work
        const user = await User.findById(req.params.id)

        // No user to update
        if (!user) {
            return res.status(404).send()
        }

        // Using bracket notation as we want to use dynamically
        updates.forEach(update => user[update] = req.body[update])
        const updatedUser = await user.save()

        // // This won't work with middleware
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // // No user to update
        // if (!user) {
        //     return res.status(404).send()
        // }

        // Updated successfully
        res.send(updatedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete User
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        // No user to delete
        if (!user) {
            return res.status(404).send()
        }

        // Deleted successfully
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = {
    router
}
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const { User } = require('../models/user')
const { auth } = require('../middleware/auth')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

const router = new express.Router()

// set file upload directory
const upload = multer({
    // // if we dont mention any dest, then multer will give the file back to the request.
    // dest: 'avatars',
    limits: {
        // filesize is in bytes
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Upload an image!'))
        }
        cb(undefined, true)

        // cb(new Error('File must be a pdf'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})

// // Set up routes
// router.get('/test', (req, res) => {
//     console.log('From second router')
// })

// Create User
// User Signup
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        const result = await user.save()

        // sendWelcomeEmail()

        // Auth token
        const token = await user.generateAuthToken()

        res.status(201).send({ result, token })
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

        // Auth token
        const token = await user.generateAuthToken()

        res.send({ user, token })

        // res.send({ user: user.getPublicProfile(), token })
    } catch (error) {
        res.status(400).send(error)
    }
})

// User logout
router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send('Logged out succesfully')
    } catch (error) {
        res.status(500).send(error)
    }
})

// User logout all
router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out succesfully in all devices')
    } catch (error) {
        res.status(500).send(error)
    }
})

// Will not be correct after auth 
// repurposing as user profile view
// Get own profile
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// // Will not be correct after auth 
// // repurposing as user profile view
// // Get all Users
// router.get('/users', auth, async(req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (error) {
//         res.status(500).send(error)
//     }

//     // User.find({}).then((users) => {
//     //     res.send(users)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// // Not needed anymore as we cannot see other users
// // Get a specific User
// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }

//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// Upload profile pic
router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    //req.user.avatar = req.file.buffer

    const buffer = await sharp(req.file.buffer)
        .resize({
            width: 250,
            height: 250
        }).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Remove profile pic
router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Serving profile pic
router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        // setting the response header
        res.set('Content-Type', 'image/png').send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

// Update User
router.patch('/users/me', auth, async(req, res) => {
    // check if user tries to update non-updatable fields.
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        // Using bracket notation as we want to use dynamically
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()

        // Updated successfully
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// // redundant now
// // Update User
// router.patch('/users/:id', async(req, res) => {
//     // check if user tries to update non-updatable fields.
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const updates = Object.keys(req.body)

//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         res.status(400).send({ error: 'Invalid update!' })
//     }

//     try {
//         // To make the middleware work
//         const user = await User.findById(req.params.id)

//         // No user to update
//         if (!user) {
//             return res.status(404).send()
//         }

//         // Using bracket notation as we want to use dynamically
//         updates.forEach(update => user[update] = req.body[update])
//         const updatedUser = await user.save()

//         // // This won't work with middleware
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         // // No user to update
//         // if (!user) {
//         //     return res.status(404).send()
//         // }

//         // Updated successfully
//         res.send(updatedUser)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// Delete User
router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // // No user to delete
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()

        // sendCancellationEmail(req.user)

        // Deleted successfully
        // res.send(user)
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// // Needs to be refactored
// // Delete User
// router.delete('/users/:id', auth, async(req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         // No user to delete
//         if (!user) {
//             return res.status(404).send()
//         }

//         // Deleted successfully
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

module.exports = {
    router
}
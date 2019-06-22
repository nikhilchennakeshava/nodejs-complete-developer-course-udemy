const express = require('express')
require('./db/mongoose')
const { User } = require('./models/user')
const { Task } = require('./models/task')
const { router: userRouter } = require('./routers/user-router')
const { router: taskRouter } = require('./routers/task-router')

const app = express()
const port = process.env.PORT || 3000


// Telling express to parse incoming requests as JSON.
app.use(express.json())

// Register user router
app.use(userRouter)

// Register task router
app.use(taskRouter)

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


// // Testing file uploads
// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits: {
//         // filesize is in bytes
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // With regular expressions
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('File must be a doc file'))
//         }

//         // if (!file.originalname.endsWith('.pdf')) {
//         //     return cb(new Error('File must be a pdf'))
//         // }

//         cb(undefined, true)

//         // cb(new Error('File must be a pdf'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// const expressMiddleware = (req, res, next) => {
//     throw new Error('error from express middleware')
// }

// app.post('/upload', expressMiddleware, (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


// // Custom middleware - Needs to be defined before any other middleware
// // Authentication
// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()

//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// // Maintainence mode
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down for maintenance. Check back soon!')
// })


// // Testing ref expansion and relationship
// // virtual property setting
// const main = async() => {
//     // // finding user of a given task
//     // const task = await Task.findById('5d0cc00f6929993480b9c13f')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     // finding all tasks of a given user
//     const user = await User.findById('5d0cbedcb44d384ca8f20d3c')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()

// // Testing jwt
// const jwt = require('jsonwebtoken')

// const myFunction = async() => {
//     // Generate token with expiry date
//     const token = jwt.sign({ _id: '12345' }, 'thisismycourse', { expiresIn: '1 day' })
//     console.log(token)

//     // Verify token using token and the secret
//     const data = jwt.verify(token, 'thisismycourse')
//     console.log(data)
// }

// myFunction()

// // Testing hashing
// const bcrypt = require('bcryptjs')

// const myFunction = async() => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare(password, hashedPassword)
//     console.log(isMatch)
// }

// myFunction()


// // Second Router
// const router = new express.Router()

// // Set up routes
// router.get('/test', (req, res) => {
//     console.log('From second router')
// })

// // Register the router
// app.use(router)



// // Create User
// app.post('/users', async(req, res) => {
//     const user = new User(req.body)

//     try {
//         const result = await user.save()
//         res.status(201).send(result)
//     } catch (error) {
//         res.status(400).send(error)
//     }

//     // user.save().then((result) => {
//     //     res.status(201).send(result)
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     //         // res.send(e)
//     // })
// })

// // Get all Users
// app.get('/users', async(req, res) => {
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

// // Get a specific User
// app.get('/users/:id', async(req, res) => {
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

// // Update User
// app.patch('/users/:id', async(req, res) => {
//     // check if user tries to update non-updatable fields.
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const updates = Object.keys(req.body)

//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         res.status(400).send({ error: 'Invalid update!' })
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         // No user to update
//         if (!user) {
//             return res.status(404).send()
//         }

//         // Updated successfully
//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// // Delete User
// app.delete('/users/:id', async(req, res) => {
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

// // Create Task
// app.post('/tasks', async(req, res) => {
//     const task = new Task(req.body)

//     try {
//         const result = await task.save()
//         res.status(201).send(result)
//     } catch (error) {
//         res.status(400).send(error)
//     }

//     // task.save().then((result) => {
//     //     res.status(201).send(result)
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     //         // res.send(e)
//     // })
// })

// // Get all Tasks
// app.get('/tasks', async(req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.send(tasks)
//     } catch (error) {
//         res.status(500).send(error)
//     }

//     // Task.find({}).then((tasks) => {
//     //     res.send(tasks)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// // Get a specific Task
// app.get('/tasks/:id', async(req, res) => {
//     const _id = req.params.id

//     try {
//         const task = await Task.findById(_id)
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }

//     // Task.findById(_id).then((task) => {
//     //     if (!task) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(task)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// // Update Task
// app.patch('/tasks/:id', async(req, res) => {
//     // check if user tries to update non-updatable fields.
//     const allowedUpdates = ['description', 'completed']
//     const updates = Object.keys(req.body)

//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if (!isValidOperation) {
//         res.status(400).send({ error: 'Invalid update!' })
//     }

//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         // No task to update
//         if (!task) {
//             return res.status(404).send()
//         }

//         // Updated successfully
//         res.send(task)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// // Delete Task
// app.delete('/tasks/:id', async(req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)

//         // No task to delete
//         if (!task) {
//             return res.status(404).send()
//         }

//         // Deleted successfully
//         res.send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })
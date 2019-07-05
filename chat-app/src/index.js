const path = require('path')
const express = require('express')
const hbs = require('hbs')

// for sockets
const http = require('http')
const socketio = require('socket.io')

// bad-words filter
const BadWordsFilter = require('bad-words')

// custom utils
const { generateMessage, generateLocationMessage } = require('./utils/messages')

// express
const app = express()

// config socket.io
const server = http.createServer(app)
const io = socketio(server)

// Defining paths for Express config
const public_directory_path = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up static directory - Serve up Static assets
app.use(express.static(public_directory_path))

// Setting up handlebars - hbs template engine and views location
app.set('view engine', 'hbs') // setting view engine
app.set('views', viewsPath) // setting the views directory
hbs.registerPartials(partialsPath) // setting the partials directory

// Set the port of application
const port = process.env.PORT

app.get('', (req, res) => {
    res.render('index')
})

// server socket connection function
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // // welcome message
    // socket.emit('message', 'Welcome!')

    // using functions and objects
    socket.emit('message', generateMessage('Welcome!'))

    // broadcast message
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    // listen to message
    socket.on('sendMessage', (message, callback) => {
        const filter = new BadWordsFilter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', generateMessage(message))
        callback()
    })

    // listen to location and send link to google maps
    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    // when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })
})

// Count expample

// let count = 0
// server socket connection function
// io.on('connection', (socket) => {
//     console.log('New WebSocket connection')

// // count example
// // send messaage to client via event
// socket.emit('countUpdated', count)

// socket.on('increment', () => {
//     count++

//     // // will emit to particular connection
//     // socket.emit('countUpdated', count)

//     // will emit to all connections
//     io.emit('countUpdated', count)
// })
// })

// Start the server using refactored http
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// // Start the server
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })
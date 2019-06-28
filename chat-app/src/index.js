const path = require('path')
const express = require('express')
const hbs = require('hbs')
const http = require('http')
const socketio = require('socket.io')

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

// let count = 0

// server socket connection function
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // welcome message
    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

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
})

// Start the server using refactored http
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// // Start the server
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })
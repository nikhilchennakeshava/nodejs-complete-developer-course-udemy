const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Require utils
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
    // import forecast from './utils/forecast'
    // import { geocode } from './utils/geocode'

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../views'))

const app = express()

// Defining paths for Express config
// const viewsPath = path.join(__dirname, '../views')
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
app.set('port', process.env.PORT || 3000)

// Using template engine render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nikhil'
    })
})

// Sending back plaintext
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// Sending back html element
// app.get('', (req, res) => {
//     res.send('<h1>Home</h1>')
// })

// Sending back Json object
// app.get('', (req, res) => {
//     res.send({
//         name: 'Nikhil',
//         level: 'admin'
//     })
// })

// Sending back array of Json objects
// app.get('', (req, res) => {
//     res.send([{
//         name: 'Nikhil',
//         level: 'admin'
//     }, {
//         name: 'admin',
//         level: 'admin'
//     }])
// })

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Ask and ye shall receive',
        name: 'Nikhil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nikhil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search location!'
        })
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        // console.log('Getting Forecast data for', data.location)
        forecast.forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                    address: req.query.address,
                    location: location,
                    forecast: data
                })
                // console.log('Getting Forecast data for', location)
                // console.log(forecastData)
        })
    })

    // res.send({
    //     address: req.query.address
    // })
})

// Dummy api
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term!'
//         })
//     }
//     console.log(req.params)
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errorMessage: 'Help article not found',
        name: 'Nikhil'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errorMessage: 'Page not found',
        name: 'Nikhil'
    })
})

app.listen(app.get('port'), () => {
    console.log('Listening on Port', app.get('port'))
})

// app.listen(3000, () => {
//     console.log('Listening on Port', )
// })
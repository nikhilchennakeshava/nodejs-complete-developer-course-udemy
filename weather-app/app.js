// console.log('Starting')

// setTimeout(() => {
//     console.log('2 SEC TIMER')
// }, 2000)

// setTimeout(() => {
//     console.log('0 SEC TIMER')
// }, 0)

// console.log('Ending')

// // Starting
// // Ending
// // 0 SEC TIMER
// // 2 SEC

// const request = require('request')

// const secretKey = '4018ffab752ef35a8d760801f6632186'
// const url = 'https://api.darksky.net/forecast/4018ffab752ef35a8d760801f6632186/37.8267,-122.4233'

// request(url, (error, response, body) => {
//     if (error)
//         console.error('Error while fetching data')
//     else {
//         // console.log('Response:', response)
//         // const data = JSON.parse(response.body)
//         // console.log(data)
//         const data = JSON.parse(body)
//         console.log(data)
//     }
// })

// request({ url: url, json: true }, (error, response) => {
//     if (error)
//         console.error('Error while fetching data')
//     else {
//         // console.log('Response:', response)
//         const data = JSON.parse(response.body)
//             // console.log(data)
//         console.log(data.currently)
//     }
// })


// const request = require('request')

// const secretKey = '4018ffab752ef35a8d760801f6632186'
// const darksky_url = 'https://api.darksky.net/forecast/4018ffab752ef35a8d760801f6632186/37.8267,-122.4233'

// const darksky_qs = {
//     units: 'si'
// }

// const darksky_options = {
//     url: darksky_url,
//     json: true, // will make the response as a json so that we don't have to parse the resonse everytime
//     qs: darksky_qs
// }

// request(darksky_options, (error, response) => {
//     if (error)
//         console.error('Unable to connect to - Darksky')
//     else if (response.body.error) {
//         console.error('Invalid request')
//     } else {
//         // console.log('Response:', response)
//         // const data = JSON.parse(response.body)
//         // console.log(data)
//         // console.log(data.currently)
//         // console.log(response)
//         console.log(response.body.currently)
//     }
// })

// const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json'
// const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bangalore.json'
// const mapbox_key = 'pk.eyJ1IjoiYjYzODg0MSIsImEiOiJjand2MHlvcTMwNDA0M3ltaGpjNnp2OGJuIn0.KarZd85SfPnniE_ievHRUQ'

// const mapbox_qs = {
//     access_token: mapbox_key,
//     limit: '3'
// }

// const mapbox_options = {
//     url: mapbox_url,
//     json: true,
//     qs: mapbox_qs
// }

// request(mapbox_options, (error, response) => {
//     if (error)
//         console.error('Unable to connect to - Map box')
//     else if (!response.body.features.length) {
//         console.error('Invalid request')
//     } else {
//         console.log(response.body.features[0])
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]

//         console.log(latitude, longitude)
//     }
// })


// const request = require('request')

// const geocode = (address, callback) => {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`
//     const key = 'pk.eyJ1IjoiYjYzODg0MSIsImEiOiJjand2MHlvcTMwNDA0M3ltaGpjNnp2OGJuIn0.KarZd85SfPnniE_ievHRUQ'
//     const qs = {
//         access_token: key,
//         limit: '3'
//     }
//     const options = {
//         url: url,
//         json: true,
//         qs: qs
//     }
//     request(mapbox_options, (error, response) => {
//         if (error)
//         // callback('Unable to connect to - Map box', undefined)
//             callback('Unable to connect to - Map box')
//         else if (!response.body.features.length) {
//             callback('Invalid request', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }


// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

// geocode.geocode('bengaluru', (error, data) => {
//     if (error) {
//         console.error(error)
//     } else {
//         console.log(data)
//     }
// })

// forecast.forecast(0, 0, (error, data) => {
//     if (error) {
//         console.error(error)
//     } else {
//         console.log(data)
//     }
// })


// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

// geocode.geocode('bengaluru', (error, data) => {
//     if (error) {
//         console.error(error)
//     } else {
//         console.log('Getting Forecast data for', data.location)
//         forecast.forecast(data.latitude, data.longitude, (error, data) => {
//             if (error) {
//                 console.error(error)
//             } else {
//                 console.log(data)
//             }
//         })
//     }
// })

// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

// geocode.geocode('bengaluru', (error, data) => {
//     if (error) {
//         return console.error(error)
//     }
//     // console.log('Getting Forecast data for', data.location)
//     forecast.forecast(data.latitude, data.longitude, (error, forecastData) => {
//         if (error) {
//             return console.error(error)
//         }
//         console.log('Getting Forecast data for', data.location)
//         console.log(forecastData)
//     })
// })



// Normal code 

// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

// const location = process.argv[2]
// if (!location) {
//     console.error('Not enough arguments')
// } else {
//     geocode.geocode(location, (error, data) => {
//         if (error) {
//             return console.error(error)
//         }
//         // console.log('Getting Forecast data for', data.location)
//         forecast.forecast(data.latitude, data.longitude, (error, forecastData) => {
//             if (error) {
//                 return console.error(error)
//             }
//             console.log('Getting Forecast data for', data.location)
//             console.log(forecastData)
//         })
//     })
// }


// Destructured code

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]
if (!location) {
    console.error('Not enough arguments')
} else {
    geocode.geocode(location, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.error(error)
        }
        // console.log('Getting Forecast data for', data.location)
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.error(error)
            }
            console.log('Getting Forecast data for', location)
            console.log(forecastData)
        })
    })
}
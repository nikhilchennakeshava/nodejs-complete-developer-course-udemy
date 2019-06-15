const request = require('request')

// destrucured code

const forecast = (latitude, longitude, callback) => {
    const key = '4018ffab752ef35a8d760801f6632186'

    // const url = 'https://api.darksky.net/forecast/4018ffab752ef35a8d760801f6632186/37.8267,-122.4233'
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`

    const qs = {
        units: 'si'
    }

    const options = {
        url,
        json: true, // will make the response as a json so that we don't have to parse the resonse everytime
        qs
    }

    request(options, (error, { body }) => {
        if (error)
            callback('Unable to connect to - Darksky')
        else if (body.error) {
            callback('Invalid request')
        } else {
            // callback(undefined, response.body.currently)
            callback(undefined, `${body.currently.summary} weather. Temperature is ${body.currently.temperature}`)
        }
    })
}

// normal code

// const forecast = (latitude, longitude, callback) => {
//     const key = '4018ffab752ef35a8d760801f6632186'

//     // const url = 'https://api.darksky.net/forecast/4018ffab752ef35a8d760801f6632186/37.8267,-122.4233'
//     const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`

//     const qs = {
//         units: 'si'
//     }

//     const options = {
//         url: url,
//         json: true, // will make the response as a json so that we don't have to parse the resonse everytime
//         qs: qs
//     }

//     request(options, (error, response) => {
//         if (error)
//             callback('Unable to connect to - Darksky')
//         else if (response.body.error) {
//             callback('Invalid request')
//         } else {
//             // callback(undefined, response.body.currently)
//             callback(undefined, `${response.body.currently.summary} weather. Temperature is ${response.body.currently.temperature}`)
//         }
//     })
// }

module.exports = {
    forecast
}
const request = require('request')

// Destrucured code 

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`
    const key = 'pk.eyJ1IjoiYjYzODg0MSIsImEiOiJjand2MHlvcTMwNDA0M3ltaGpjNnp2OGJuIn0.KarZd85SfPnniE_ievHRUQ'
    const qs = {
        access_token: key,
        limit: '3'
    }
    const options = {
        url,
        json: true,
        qs
    }
    request(options, (error, { body }) => {
        if (error)
        // callback('Unable to connect to - Map box', undefined)
            callback('Unable to connect to - Map box')
        else if (!body.features.length) {
            callback('Invalid request', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// Normal code

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
//     request(options, (error, response) => {
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

module.exports = {
    geocode
}
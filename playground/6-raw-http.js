const https = require('https')

const url = 'https://api.darksky.net/forecast/4018ffab752ef35a8d760801f6632186/37.8267,-122.4233'

const request = https.request(url, response => {
    let data = ''

    response.on('data', chunk => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        // console.log(data)
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', error => {
    console.log(error)
})

request.end()
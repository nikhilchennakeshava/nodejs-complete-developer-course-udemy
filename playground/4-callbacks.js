setTimeout(() => {
    console.log('2 sec over. Die!')
}, 2000)

const names = ['Nikhil', 'Priyanka', 'Ren']

const shortNames = names.filter(name => name.length < 4)

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            lat: 0,
            long: 0
        }
        callback(data)
    }, 2000)
}

geocode('bangalore', (data) => console.log(data))

doWorkCallback = (callback) => {
    setTimeout(() => {
        callback('This is my error')
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }
    console.log(result)
})
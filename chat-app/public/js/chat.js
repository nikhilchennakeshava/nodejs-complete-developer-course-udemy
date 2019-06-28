$(document).ready(function() {
    const socket = io()

    socket.on('message', (message) => {
        console.log(message)
    })

    $('#message-form').submit(function(e) {
        e.preventDefault()
        const message = $('#message').val()

        socket.emit('sendMessage', message, (error) => {
            if (error) {
                return console.log('Error', error)
            }
            console.log('Message Delivered')
        })
    })

    // Browser based Geolocation
    $('#send-location').click(function() {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser!')
        }

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)

            // sending location from client to server
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, () => {
                console.log('Location shared!')
            })
        })
    })

    // // count example

    // // client socket function
    // socket.on('countUpdated', (count) => {
    //     console.log('count has been updated', count)
    //     $('#count').text(count)
    // })

    // $('#increment').click(function() {
    //     // alert('clicked')
    //     socket.emit('increment')
    // })
})
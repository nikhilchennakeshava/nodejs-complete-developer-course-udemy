$(document).ready(function() {
    const socket = io()

    socket.on('message', (message) => {
        console.log(message)
    })

    $('#message-form').submit(function(e) {
        e.preventDefault()
        const message = $('#message').val()

        socket.emit('sendMessage', message)
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
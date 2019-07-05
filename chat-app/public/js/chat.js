$(document).ready(function() {
    const socket = io()

    // templates
    const messageTemplate = '<div class="message"><p><span class="message__name">User name</span><span class="message__meta">{{createdAt}}</span></p><p>{{message}}</p></div>'
    const locationMessageTemplate = '<div class="message"><p><span class="message__name">User name</span><span class="message__meta">{{createdAt}}</span></p><p><a href="{{url}}" target="_blank" class="btn-link">Current location</a></p></div>'

    // Options in query
    const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

    socket.on('message', (message) => {
        console.log(message)

        // displaying messages using mustache template
        // console.log($('#message-template').html())
        // const messageHtml = Mustache.to_html($('#message-template').html(), {
        //     message
        // })

        // const messageHtml = Mustache.to_html(messageTemplate, { message })

        const messageHtml = Mustache.to_html(messageTemplate, {
            message: message.text,
            // createdAt: message.createdAt
            createdAt: moment(message.createdAt).format('h:mm A')
        })
        $('#messages').append(messageHtml)
    })

    socket.on('locationMessage', (message) => {
        console.log(message)
        const locationMessageHtml = Mustache.to_html(locationMessageTemplate, {
            url: message.url,
            createdAt: moment(message.createdAt).format('h:mm A')
        })
        $('#messages').append(locationMessageHtml)
    })

    $('#message-form').submit(function(e) {
        e.preventDefault()
        const message = $('#message').val()

        // disable form while sending a message
        $('#send-btn').attr('disabled', 'disabled')

        socket.emit('sendMessage', message, (error) => {
            if (error) {
                return console.log('Error', error)
            }
            console.log('Message Delivered')

            // enable form after message sent
            $('#send-btn').removeAttr('disabled')
            $('#message').val('')
            $('#message').focus()
        })
    })

    // Browser based Geolocation
    $('#send-location').click(function() {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser!')
        }

        // disable button
        $(this).attr('disabled', 'disabled')

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)

            // sending location from client to server
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, () => {
                console.log('Location shared!')

                // enable button
                $(this).removeAttr('disabled')
            })
        })
    })

    // joining room
    socket.emit('join', { username, room })

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
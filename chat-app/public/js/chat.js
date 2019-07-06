$(document).ready(function() {
    const socket = io()

    // templates
    const messageTemplate = '<div class="message"><p><span class="message__name">{{username}}</span><span class="message__meta">{{createdAt}}</span></p><p>{{message}}</p></div>'
    const locationMessageTemplate = '<div class="message"><p><span class="message__name">{{username}}</span><span class="message__meta">{{createdAt}}</span></p><p><a href="{{url}}" target="_blank" class="btn-link">Current location</a></p></div>'
    const sidebarTemplate = '<h2 class="room-title">{{room}}</h2><h3 class="list-title">Users</h3><ul class="users">{{#users}}<li>{{username}}</li>{{/users}}</ul>'

    // Options in query
    const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

    // autoscroll
    const autoscroll = () => {
        // // new message
        // const $newMessage = $('#messages:last-child')

        // // height of new message
        // const newMessageMargin = parseInt($newMessage.css('marginBottom'))
        // const newMessageHeight = $newMessage.outerHeight() + newMessageMargin

        // // visible height
        // const visibleHeight = parseInt($('#messages').outerHeight())

        // // height of messages container
        // const containerHeight = $('#messages').prop('scrollHeight')

        // // how far have i scrolled
        // const scrollOffset = $('#messages').scrollTop() + visibleHeight

        // if (containerHeight - newMessageHeight <= scrollOffset) {
        //     $('#messages').animate({
        //         scrollTop: parseInt(containerHeight)
        //     }, 1000)
        // }

        $('#messages').animate({
            scrollTop: parseInt($('#messages').prop('scrollHeight'))
        }, 500)
    }

    socket.on('message', (message) => {
        console.log(message)

        // displaying messages using mustache template
        // console.log($('#message-template').html())
        // const messageHtml = Mustache.to_html($('#message-template').html(), {
        //     message
        // })

        // const messageHtml = Mustache.to_html(messageTemplate, { message })

        const messageHtml = Mustache.to_html(messageTemplate, {
            username: message.username,
            message: message.text,
            // createdAt: message.createdAt
            createdAt: moment(message.createdAt).format('h:mm A')
        })
        $('#messages').append(messageHtml)
        autoscroll()
    })

    socket.on('locationMessage', (message) => {
        console.log(message)
        const locationMessageHtml = Mustache.to_html(locationMessageTemplate, {
            username: message.username,
            url: message.url,
            createdAt: moment(message.createdAt).format('h:mm A')
        })
        $('#messages').append(locationMessageHtml)
        autoscroll()
    })

    socket.on('roomData', ({ users, room }) => {
        const sidebarHtml = Mustache.to_html(sidebarTemplate, {
            users,
            room
        })
        $('#sidebar').html(sidebarHtml)
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
    socket.emit('join', { username, room }, (error) => {
        if (error) {
            alert(error)
            location.href = '/'
        }
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
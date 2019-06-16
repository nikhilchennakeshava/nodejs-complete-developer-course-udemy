// console.log('Client side JavaScript!')

// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json().then((data) => {
//             console.log(data)
//         })
//     })

// fetch('http://localhost:3000/weather?address=bangalore')
//     .then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 console.log(data.error)
//             } else {
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
//         })
//     })


// normal javascript
// const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')
// const msg1 = document.querySelector('.msg1')
// const msg2 = document.querySelector('#msg2')
//     // const forecast = document.querySelector('.forecast')
//     // const error = document.querySelector('#error')


// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const location = search.value

//     msg1.textContent = 'Loading...'
//     msg2.textContent = ''

//     fetch(`http://localhost:3000/weather?address=${location}`)
//         .then((response) => {
//             response.json().then((data) => {
//                 if (data.error) {
//                     msg1.textContent = data.error
//                 } else {
//                     msg1.textContent = data.location
//                     msg2.textContent = data.forecast
//                 }
//             })
//         })
// })


// jQuery

$(document).ready(function() {
    $('#locationForm').submit(function(e) {
        e.preventDefault()
            // const location = $('#locationForm').serialize()
        const location = $('#location').val()

        $('.msg1').text('Loading...')
        $('#msg2').text('')

        // fetch(`http://localhost:3000/weather?address=${location}`)
        fetch(`/weather?address=${location}`)
            .then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        $('.msg1').text(data.error)
                    } else {
                        $('.msg1').text(data.location)
                        $('#msg2').text(data.forecast)
                    }
                })
            })
    })
})
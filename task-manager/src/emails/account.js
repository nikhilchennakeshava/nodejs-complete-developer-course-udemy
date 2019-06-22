const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'b1499547@urhen.com',
//     from: 'andrew@mead.io',
//     subject: 'first mail',
//     text: 'first one'
// })

const sendWelcomeEmail = ({ email, name } = {}) => {
    sgMail.send({
        to: email,
        from: 'andrew@mead.io',
        subject: 'Welcome to The Company',
        text: `Welcome to the company ${name}. Hope you enjoy!`
    })
}

const sendCancellationEmail = ({ email, name } = {}) => {
    sgMail.send({
        to: email,
        from: 'andrew@mead.io',
        subject: 'Sorry to see you go',
        text: `Sorry to see you go ${name}. Good bye!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
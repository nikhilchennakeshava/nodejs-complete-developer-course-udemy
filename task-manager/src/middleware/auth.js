const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded_token = jwt.verify(token, 'thisismycourse')

        // check user
        const user = await User.findOne({ _id: decoded_token._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        // send the user back in request for further use
        req.user = user

        // resume execution
        next()
    } catch (error) {
        return res.status(401).send({ error: 'User not authorized. Please send valid JWT' })
    }
}

module.exports = {
    auth
}
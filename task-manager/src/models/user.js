const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Task } = require('./task')

// Creating the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password is invalid. It cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// virtual property
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Instance method
// Generate Public profile
// use default method name to automate
// userSchema.methods.getPublicProfile = async function() {
userSchema.methods.toJSON = function() {
    const user = this

    // generate userObject
    const userObject = user.toObject()

    // deleting sensitive information
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// Instance method
// Generate Auth tokens
userSchema.methods.generateAuthToken = async function() {
    const user = this

    // generate token
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismycourse', { expiresIn: '1 day' })

    // add token to user
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// Model method
// Validating the credentials
userSchema.statics.findByCredentials = async({ email, password } = {}) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Incorrect Email')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Incorrect Password')
    }

    return user
}

// Hook to hash the plaintext password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    // telling the middleware we are done and to proceed with normal execution.
    next()
})

// Hook to delete all the tasks of users when user is deleted
userSchema.pre('remove', async function(next) {
    const user = this

    // deleting all taks for the user
    await Task.deleteMany({ owner: user._id })

    // telling the middleware we are done and to proceed with normal execution.
    next()
})

// Creating the model
const User = mongoose.model('User', userSchema)

module.exports = {
    User
}

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password is invalid. It cannot contain "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })

// module.exports = {
//     User
// }
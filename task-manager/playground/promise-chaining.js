require('../src/db/mongoose')
const { User } = require('../src/models/user')
const { Task } = require('../src/models/task')

// 5d092e0b5092f94970666af9

// User.findByIdAndUpdate('5d092e0b5092f94970666af9', { age: 1 })
//     .then((user) => {
//         console.log(user)
//         return User.countDocuments({ age: 1 })
//     }).then((result) => {
//         console.log(result)
//     }).catch((e) => {
//         console.log(e)
//     })

// Async/await
const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5d092e0b5092f94970666af9', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
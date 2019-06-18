require('../src/db/mongoose')
const { User } = require('../src/models/user')
const { Task } = require('../src/models/task')

// 5d07f7667cd6c510506ecdef

// Task.findByIdAndDelete('5d07f7667cd6c510506ecdef')
//     .then((task) => {
//         console.log(task)
//         return Task.countDocuments({ completed: false })
//     }).then((result) => {
//         console.log(result)
//     }).catch((e) => {
//         console.log(e)
//     })

// Async/await
const deleteTaskAndCount = async(id) => {
    const user = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5d088b396ee0f158381a1249').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
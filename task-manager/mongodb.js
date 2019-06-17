// CRUD - Create, Read, Update and Delete

// // Imports for mongodb
// const mongodb = require('mongodb')

// // Connection config for MongoDb
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectID

// Destructured imports
const { MongoClient, ObjectID } = require('mongodb')

// Connection configs
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// // ObjectID parameters
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)

// // Inserting
// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.error('Unable to connect to database')
//     }
//     const db = client.db(databaseName)

//     // Insert One 
//     // db.collection('users').insertOne({
//     //     _id: id,
//     //     name: 'John',
//     //     age: 24
//     // }, (error, result) => {
//     //     if (error) {
//     //         return console.error('Unable to insert user')
//     //     }
//     //     console.log(result.ops)
//     // })

//     // Insert Many
//     // db.collection('users').insertMany([{
//     //         name: 'Jen',
//     //         age: 25
//     //     },
//     //     {
//     //         name: 'Rachel',
//     //         age: 28
//     //     }
//     // ], (error, result) => {
//     //     if (error) {
//     //         return console.error('Unable to insert users')
//     //     }
//     //     console.log(result.ops)
//     // })

//     // db.collection('tasks').insertMany([{
//     //         description: 'Clean house',
//     //         completed: true
//     //     },
//     //     {
//     //         description: 'Complete node course',
//     //         completed: false
//     //     }
//     // ], (error, result) => {
//     //     if (error) {
//     //         return console.error('Unable to insert tasks')
//     //     }
//     //     console.log(result.ops)
//     // })
// })

// // Querying
// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.error('Unable to connect to database')
//     }
//     const db = client.db(databaseName)

//     // db.collection('users').findOne({
//     //     name: 'Jen'
//     // }, (error, result) => {
//     //     if (error) {
//     //         return console.error('Unable to fetch')
//     //     }
//     //     console.log(result)
//     // })

//     // // Search by ID
//     // db.collection('users').findOne({
//     //     _id: ObjectID('5d07d7d4e001584cac6e3c4d')
//     // }, (error, result) => {
//     //     if (error) {
//     //         return console.error('Unable to fetch')
//     //     }
//     //     console.log(result)
//     // })

//     // // Find
//     // db.collection('users').find({ age: 24 }).toArray((error, result) => {
//     //     console.log(result)
//     // })

//     // db.collection('users').find({ age: 24 }).count((error, result) => {
//     //     console.log(result)
//     // })
// })

// // Updating
// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.error('Unable to connect to database')
//     }
//     const db = client.db(databaseName)

//     // const updatePromise = db.collection('users').updateOne({
//     //     _id: ObjectID('5d07e7baf9c4c0225ef4ec12')
//     // }, {
//     //     $set: {
//     //         name: 'Melissa'
//     //     }
//     // })

//     // updatePromise.then(result => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

//     // db.collection('users').updateOne({
//     //     _id: ObjectID('5d07e7baf9c4c0225ef4ec12')
//     // }, {
//     //     $set: {
//     //         name: 'Melissa'
//     //     }
//     //     // $inc: {
//     //     //     age: 1
//     //     // }
//     // }).then(result => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

//     db.collection('tasks').updateMany({
//         completed: false
//     }, {
//         $set: {
//             completed: true
//         }
//         // $inc: {
//         //     age: 1
//         // }
//     }).then(result => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
// })

// Deleting
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.error('Unable to connect to database')
    }
    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        age: 25
    }).then(result => {
        console.log(result)
    }).catch(error => console.log(error))
})
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

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.error('Unable to connect to database')
    }
    const db = client.db(databaseName)

    // Insert One 
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'John',
    //     age: 24
    // }, (error, result) => {
    //     if (error) {
    //         return console.error('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // Insert Many
    // db.collection('users').insertMany([{
    //         name: 'Jen',
    //         age: 25
    //     },
    //     {
    //         name: 'Rachel',
    //         age: 28
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.error('Unable to insert users')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([{
    //         description: 'Clean house',
    //         completed: true
    //     },
    //     {
    //         description: 'Complete node course',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.error('Unable to insert tasks')
    //     }
    //     console.log(result.ops)
    // })
})
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { User } = require('../../src/models/user')
const { Task } = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'User 1',
    email: 'user1@admin.com',
    password: 'user199',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'User 2',
    email: 'user2@admin.com',
    password: 'user299',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task 1',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task 2',
    completed: true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task 3',
    completed: false,
    owner: userTwo._id
}

const setUpDatabase = async() => {
    // Clean database
    await User.deleteMany()
    await Task.deleteMany()

    // Add test user data
    await new User(userOne).save()
    await new User(userTwo).save()

    // Add test task data
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase
}
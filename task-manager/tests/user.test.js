const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { app } = require('../src/app')
const { User } = require('../src/models/user')

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

// before each
beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Nikhil',
        email: 'nikhil@admin.com',
        password: 'mypass099'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.result._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        result: {
            name: 'Nikhil',
            email: 'nikhil@admin.com',
        },
        token: user.tokens[0].token
    })

    // Assert about password stored in database
    expect(user.password).not.toBe('mypass099')
})

test('Should login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non existant user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'badpassword!!2'
    }).expect(400)
})

test('Should get user profile', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get user profile when wrong jwt', async() => {
    await request(app)
        .get('/users/me')
        // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})

test('Should delete user profile', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete user profile for wrong jwt', async() => {
    await request(app)
        .delete('/users/me')
        // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401)
})
const request = require('supertest')
const { app } = require('../src/app')

test('Should sign up new user', async() => {
    await request(app).post('/users').send({
        name: 'Nikhil',
        email: 'nikhil@admin.com',
        password: 'mypass099'
    }).expect(201)
})
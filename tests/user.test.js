const request = require('supertest')
const app = require('../src/app')


test('Should singup a new user', async () => {
    await request(app).post('/users').send({
        name: 'masa',
        email: 'marcsantamariatomasa@gmail.com',
        pw: 'mA77667-'
    }).expect(201)
})
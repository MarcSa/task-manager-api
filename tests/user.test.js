const request = require('supertest')
const app = require('../src/app')


test('Should singup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Marc',
        email: 'marc@marcvirtual.com',
        pw: 'masA1983-'
    }).expect(201)
})
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: 'mA78967!'
}

beforeEach( async () =>{
    await User.deleteMany()
    await new User(userOne).save()
})


test('Should singup a new user', async () => {
    await request(app).post('/users').send({
        name: 'masa',
        email: 'marcsantamariatomasa@gmail.com',
        password: 'mA77667-'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: 'john@example.com',
        password:'John123!-'
    }).expect(400)
})

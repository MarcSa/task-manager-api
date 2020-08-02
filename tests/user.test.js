const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId= new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'mA78967!',
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach( async () =>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should singup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'masa',
        email: 'marcsantamariatomasa@example.com',
        password: 'mA77667-'
    }).expect(201)


    // Assert that the database was changed correctly

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    //assertions about the response

    expect(response.body).toMatchObject({
        user: {
            name: 'masa',
            email: 'marcsantamariatomasa@example.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mA77667-')
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

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete accouts for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200) 
})

test('Should not delete accouts for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401) 
})


const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('users', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })

  describe('list', async () => {
    it('list empty', async () => {
      // Return an empty user list by default
      const {body: users} = await supertest(app)
      .get('/users')
      .expect(200)
      users.should.eql([])
    })
    
    it('list one user', async () => {
      // Create a user
      await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'test@email.fr'})
      // Ensure we list the users correctly
      const {body: users} = await supertest(app)
      .get('/users')
      .expect(200)
      users.should.match([{
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        username: 'user_1',
        email: 'test@email.fr'
      }])
    })
  })
  
  describe('add', () => {
    it('add one element', async () => {
      // Create a user
      const {body: user} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'test@email.fr'})
      .expect(201)
      // Check its return value
      // Check it was correctly inserted
      const {body: users} = await supertest(app)
      .get('/users')
      users.length.should.eql(1)
    })
  })

  describe('get', async () => {
    it('get user', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'test@email.fr'})
      // Check it was correctly inserted
      const {body: user} = await supertest(app)
      .get(`/users/${user1.id}`)
      .expect(200)
      user.username.should.eql('user_1')
      user.email.should.eql('test@email.fr')
    })
  })
  
})

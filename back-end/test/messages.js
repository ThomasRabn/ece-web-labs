
const supertest = require('supertest')
const microtime = require('microtime')
const app = require('../lib/app')
const db = require('../lib/db')

describe('messages', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
    await supertest(app)
    .post('/users')
    .send({username: 'test', email: 'test@email.fr'})
  })
  
  describe('list', () => {
    it('list empty', async () => {
      // Create a channel
      const {body: channel} = await supertest(app)
      .post('/channels')
      .send({ channel: {name: 'channel 1'}, owner: 'test@email.fr' })
      // Get messages
      const {body: messages} = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200)
      messages.should.eql([])
    })
    
    it('list one message', async () => {
      // Create a channel
      const {body: channel} = await supertest(app)
      .post('/channels')
      .send({ channel: {name: 'channel 1'}, owner: 'test@email.fr' })
      // and a message inside it
      await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({author: 'whoami', content: 'Hello ECE'})
      // Get messages
      const {body: messages} = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200)
      messages.should.match([{
        author: 'whoami',
        creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
        content: 'Hello ECE'
      }])
    })
  })
  
  describe('create', () => {
    it('add one element', async () => {
      // Create a channel
      const {body: channel} = await supertest(app)
      .post('/channels')
      .send({ channel: {name: 'channel 1'}, owner: 'test@email.fr' })
      // Create a message inside it
      const {body: message} = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({author: 'whoami', content: 'Hello ECE'})
      .expect(201)
      message.should.match({
        author: 'whoami',
        creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
        content: 'Hello ECE'
      })
      // Check it was correctly inserted
      const {body: messages} = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      messages.length.should.eql(1)
    })
  })
  
})

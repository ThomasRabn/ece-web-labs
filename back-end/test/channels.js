
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('channels', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
    await supertest(app)
    .post('/users')
    .send({username: 'test', email: 'test@email.fr'})
  })

  describe('create', () => {
    it('create one element', async () => {
      // Create a channel
      const {body: channel} = await supertest(app)
      .post('/channels')
      .send({ channel: {name: 'channel 1'}, owner: 'test@email.fr' })
      .expect(201)
      // Check its return value
      channel.should.match({
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'channel 1',
      })
      console.log("here")
      // Check it was correctly inserted
      const {body: channels} = await supertest(app)
      .get('/channels')
      channels.length.should.eql(1)
    })
  })
  
  describe('get', () => {
    it('get channel', async () => {
      // Create a channel
      const {body: channel1} = await supertest(app)
      .post('/channels')
      .send({ channel: {name: 'channel 1'}, owner: 'test@email.fr' })
      // Check it was correctly inserted
      const {body: channel} = await supertest(app)
      .get(`/channels/${channel1.id}`)
      .expect(200)
      channel.name.should.eql('channel 1')
    })
  })
  
  describe( 'list', () => {
  
    it('list empty', async () => {
      // Return an empty channel list by default
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.eql([])
    })
    
    it('list one element', async () => {
      // Create a channel
      await supertest(app)
      .post('/channels')
      .send({ channel: {name: 'channel 1'}, owner: 'test@email.fr' })
      // Ensure we list the channels correctly
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.match([{
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'channel 1'
      }])
    })
  })

})

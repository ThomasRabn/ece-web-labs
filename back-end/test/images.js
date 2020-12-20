const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('images', () => {

  beforeEach( async () => {
    await db.admin.clear()
    await supertest(app)
    .post('/users')
    .send({username: 'test', email: 'test@email.fr'})
  })

  describe('create', () => {
    it('create one element', async () => {
      // Create a channel
      const {body: image} = await supertest(app)
      .post('/images')

      .send({ image: {name: 'image 1'}, owner : 'test@email.fr' })
      .expect(201)
      // Check its return value
      image.should.match({
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'image 1',
      })
      //console.log("here")
      // Check it was correctly inserted
      const {body: images} = await supertest(app)
      .get('/images')
      images.length.should.eql(1)
    })
  })

  describe('get', () => {
    it('get image', async () => {
      // Create a channel
      const {body: image1} = await supertest(app)
      .post('/images')
      .send({ image: {name: 'image 1'}, owner : 'test@email.fr' })
      // Check it was correctly inserted
      const {body: owner} = await supertest(app).get(`/useremails/${'test@email.fr'}`)
      //console.log(owner)
      const {body: image} = await supertest(app)
      .get(`/images/${owner.id}`)
      .expect(200)
      image.name.should.eql('image 1')
    })
  })

  describe( 'list', () => {

    it('list empty', async () => {
      // Return an empty channel list by default
      const {body: images} = await supertest(app)
      .get('/images')
      .expect(200)
      images.should.eql([])
    })

    it('list one element', async () => {
      // Create a channel
      await supertest(app)
      .post('/images')
      .send({ image: {name: 'image 1'}, owner: 'test@email.fr' })
      // Ensure we list the channels correctly
      const {body: images} = await supertest(app)
      .get('/images')
      .expect(200)
      images.should.match([{
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'image 1'
      }])
    })
  })

})

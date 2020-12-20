
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')
var multer = require('multer')

const app = express()
app.use(express.static('public'));
const authenticate = authenticator({
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', authenticate, async (req, res) => {
  try {
    const channels = await db.channels.listChannelOfUser(req.user.email)
    res.json(channels)
  } catch (error) {
    handleError(error, res)
  }
})

app.post('/channels', authenticate, async (req, res) => {
  try {
    const channel = await db.channels.create(req.body.channel, req.user.email, req.body.invitedUsers)
    // Add the channel in each user's channels list
    if(channel) {
      if (channel.idUsers){
        for(const elem of channel.idUsers) {
          await db.users.invite(elem, channel.id)
        }
      }
    }
    res.status(201).json(channel)
  } catch (error) {
    handleError(error, res)
  }
})

app.get('/channels/:id', authenticate, async (req, res) => {
  try {
    const channel = await db.channels.get(req.params.id, req.user.email)
    res.status(200).json(channel)
  } catch (error) {
    handleError(error, res)
  }
})

// app.put('/channels/:id', authenticate, async (req, res) => {
//   const channel = await db.channels.update(req.params.id, req.body)
//   res.json(channel)
// })

app.post('/channels/:id/invite', authenticate, async (req, res) => {
  const channel = await db.channels.invite(req.params.id, req.body)
  // Add the channel in each user's channels list
  if(channel) {
    for(const elem of req.body.invitedUsers) {
      await db.users.invite(elem, req.params.id)
    }
    res.status(200).json(channel)
  }
})

// Messages

app.get('/channels/:id/messages', authenticate, async (req, res) => {
  try {
    const messages = await db.messages.list(req.params.id, req.user.email)
    res.status(200).json(messages)
  } catch (error) {
    handleError(error, res)
  }
})

app.post('/channels/:id/messages', authenticate, async (req, res) => {
  try {
    const message = await db.messages.create(req.params.id, req)
    res.status(201).json(message)
  } catch (error) {
    handleError(error, res)
  }
})

app.delete('/channels/:id/messages/:idMessage', authenticate, async (req, res) => {
  try {
    const message = await db.messages.delete(req.params.id, req.params.idMessage, req)
  res.status(204).json(message)
  } catch (error) {
    handleError(error, res)
  }
})

app.put('/channels/:id/messages/:idMessage', authenticate, async (req, res) => {
  try {
    const message = await db.messages.update(req.params.id, req.params.idMessage, req)
    res.status(204).json(message)
  } catch (error) {
    handleError(error, res)
  }
})

// Users

app.get('/users', authenticate, async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.get('/usernames/search', authenticate, async (req, res) => {
  if(!req.query.name) {
    const users = await db.users.listNames()
    res.json(users)
  } else {
    const users = await db.users.searchByName(req.query.name)
    res.json(users)
  }
})

app.get('/usernames/:name', authenticate, async (req, res) => {
  const user = await db.users.getByUsername(req.params.name)
  res.json(user)
})

app.get('/useremails/:email', authenticate, async (req, res) => {
  const user = await db.users.getByEmail(req.params.email)
  res.json(user)
})

app.post('/users', authenticate, async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.get('/users/:id', authenticate, async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.put('/users/:id', authenticate, async (req, res) => {
  const user = await db.users.update(req.body)
  res.json(user)
})

const handleError = (error, res) => {
  if (error == 'Unauthorized') {
    res.status(401)
  } else if (error.toString().startsWith('Invalid')) {
    res.status(400)
  } else {
    res.status(400)
  }
}

// Images

app.get('/images', authenticate, async (req, res) => {
  const image = await db.images.list(req.headers)
  res.json(image)
})

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      //console.log(req)
      cb(null, req.user.email + '.png')
    }
})

var upload = multer({ storage: storage }).single('file')

app.post('/public', authenticate, async function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.post('/images', authenticate, async (req, res) => {
  const image = await db.images.create(req.body.image, req.body.owner)
  res.status(201).json(image)
})

app.get('/images/:id', authenticate, async (req, res) => {
  const image = await db.images.get(req.params.id)
  res.json(image)
})

app.put('/images/:id', authenticate, async (req, res) => {
  const image = await db.images.update(req.params.id, req.body)
  res.json(image)
})

module.exports = app

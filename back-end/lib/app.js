
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

// Get the channel of the connected user 
app.get('/channels', authenticate, async (req, res) => {
  try {
    const channels = await db.channels.listChannelOfUser(req.user.email)
    res.json(channels)
  } catch (error) {
    handleError(error, res)
  }
})

// Create a channel and invite the users we want to it
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

// Get the channel whose id is in the URL
app.get('/channels/:id', authenticate, async (req, res) => {
  try {
    const channel = await db.channels.get(req.params.id, req.user.email)
    res.status(200).json(channel)
  } catch (error) {
    handleError(error, res)
  }
})

// Invite user(s) to the selected channel
app.post('/channels/:id/invite', authenticate, async (req, res) => {
  try{
    const channel = await db.channels.invite(req.params.id, req.body, req.user)
    // Add the channel in each user's channels list
    if(channel) {
      console.log(channel)
      for(const elem of req.body.invitedUsers) {
        console.log(elem)
        await db.users.invite(elem, req.params.id)
      }
      res.status(200).json(channel)
    }
  } catch (error) {
    handleError(error, res)
  }
})

// Messages

// Get all the messages of the selected channel
app.get('/channels/:id/messages', authenticate, async (req, res) => {
  try {
    const messages = await db.messages.list(req.params.id, req.user.email)
    res.status(200).json(messages)
  } catch (error) {
    handleError(error, res)
  }
})

// Create a message in a given channel
app.post('/channels/:id/messages', authenticate, async (req, res) => {
  try {
    const message = await db.messages.create(req.params.id, req)
    res.status(201).json(message)
  } catch (error) {
    handleError(error, res)
  }
})

// Delete a message
app.delete('/channels/:id/messages/:idMessage', authenticate, async (req, res) => {
  try {
    const message = await db.messages.delete(req.params.id, req.params.idMessage, req)
  res.status(204).json(message)
  } catch (error) {
    handleError(error, res)
  }
})

// Modify the content of a message
app.put('/channels/:id/messages/:idMessage', authenticate, async (req, res) => {
  try {
    const message = await db.messages.update(req.params.id, req.params.idMessage, req)
    res.status(204).json(message)
  } catch (error) {
    handleError(error, res)
  }
})

// Users (not protected by token verifier as everybody should be able to access everybody)

// Get all the users
app.get('/users', authenticate, async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

// Search a username with a namestart
app.get('/usernames/search', authenticate, async (req, res) => {
  if(!req.query.name) {
    const users = await db.users.listNames()
    res.json(users)
  } else {
    const users = await db.users.searchByName(req.query.name)
    res.json(users)
  }
})

// Search a exact user with their username
app.get('/usernames/:name', authenticate, async (req, res) => {
  const user = await db.users.getByUsername(req.params.name)
  res.json(user)
})

// Search a exact user with their email address
app.get('/useremails/:email', authenticate, async (req, res) => {
  const user = await db.users.getByEmail(req.params.email)
  res.json(user)
})

// Create a user
app.post('/users', authenticate, async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

// Get a user with their ID
app.get('/users/:id', authenticate, async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

// Handle multiple errors
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

// Save an image to a folder
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, req.user.email + '.png')
    }
})

var upload = multer({ storage: storage }).single('file')

// Route to receive images and save them
app.post('/public', authenticate, async function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
      return res.status(200).send(req.file)
    })
})

module.exports = app

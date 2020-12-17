
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

const app = express()
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
  const channels = await db.channels.list(req.headers)
  res.json(channels)
})

app.post('/channels', authenticate, async (req, res) => {
  const channel = await db.channels.create(req.body.channel, req.body.owner)
  res.status(201).json(channel)
})

app.get('/channels/:id', authenticate, async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', authenticate, async (req, res) => {
  const channel = await db.channels.update(req.params.id, req.body)
  res.json(channel)
})

app.put('/channels/:id/invite', authenticate, async (req, res) => {
  const channel = await db.channels.invite(req.params.id, req.body)
  for(const elem of req.body.invitedUsers) {
    await db.users.invite(elem.id, req.params.id)
  }
  res.json(channel)
})

// Messages

app.get('/channels/:id/messages', authenticate, async (req, res) => {
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', authenticate, async (req, res) => {
  const message = await db.messages.create(req.params.id, req)
  res.status(201).json(message)
})

app.delete('/channels/:id/messages/:idMessage', authenticate, async (req, res) => {
  const message = await db.messages.delete(req.params.id, req.params.idMessage, req)
  res.status(204).json(message)
})

app.put('/channels/:id/messages/:idMessage', authenticate, async (req, res) => {
  const message = await db.messages.update(req.params.id, req.params.idMessage, req)
  res.json(message)
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

module.exports = app


const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel, ownerEmail) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      var owner = await module.exports.users.getByEmail(ownerEmail)
      channel.ownerId = owner.id
      channel = merge(channel, {usersId: [ owner.id ]})
      await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      return merge(channel, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    listChannelOfUser: async (userEmail) => {
      const user = module.exports.users.getByEmail(userEmail)
      if(user.channels && user.channels.length > 0) { return user.channels }
      else                                          { return [] }
    },
    update: async (id, channel) => {
      const original = store.channel[id]
      if(!original) throw Error('Unregistered channel id')
      store.channel[id] = merge(original, channel)
    },
    invite: async (id, channel) => {
      const data = await db.get(`channels:${id}`)
      if(!data) throw Error('Unregistered channel id')
      var original = JSON.parse(data)
      const final = merge(original, { idUsers: channel.idUsers })
      await db.put(`channels:${id}`, JSON.stringify(final))
      return final
    },
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },
  messages: {
    create: async (channelId, req) => {
      if(!channelId) throw Error('Invalid channel')
      if(!req.body.content) throw Error('Invalid message')
      creation = microtime.now()
      const author = await module.exports.users.getByEmail(req.user.email)
      if(author) {
        await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
          authorId: author.id,
          author: author.username,
          content: req.body.content,
        }))
        return merge(req.body, {creation: creation})
      } else {
        return null
      }
    },
    get: async (channelId, creation)=> {
      try {
        if(!channelId) throw Error('Invalid channel id')
        if(!creation) throw Error('Invalid message id')
        const data = await db.get(`messages:${channelId}:${creation}`)
        const message = JSON.parse(data)
        return merge(message, {creation: creation})
      } catch {
        return null
      }
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    update: async (channelId, creation, req) => {
      try {
        if(!channelId) throw Error('Invalid channel')
        if(!creation) throw Error('Invalid message')
        if(!req) throw Error('Invalid request')
        const idRequester = (await module.exports.users.getByEmail(req.user.email)).id
        var message = await module.exports.messages.get(channelId, creation)
        message.content = req.body.content
        await db.put(`messages:${channelId}:${creation}`, JSON.stringify(message))
        return message
      } catch {
        return null
      }
    },
    delete: async (channelId, creation, req) => {
      try {
        if(!channelId) throw Error('Invalid channel')
        if(!creation) throw Error('Invalid message')
        if(!req) throw Error('Invalid request')
        const idRequester = (await module.exports.users.getByEmail(req.user.email)).id
        const message = await module.exports.messages.get(channelId, creation)
        if (message.authorId == idRequester) {
          await db.del(`messages:${channelId}:${creation}`)
          return { success: true }
        }
        return null
      } catch {
        return null
      }
    },
  },
  users: {
    create: async (user) => {
      // TODO: check if username of email address already exist in the db
      if(!user.username || !user.email /*|| await module.exports.users.getByUsername(user.username) || await module.exports.users.getByEmail(user.email)*/) {
        throw Error('Invalid user')
      } 
      const id = uuid()
      await db.put(`users:${id}`, JSON.stringify(user))
      await db.put(`usernames:${user.username}`, JSON.stringify({id: id}))
      await db.put(`userEmails:${user.email}`, JSON.stringify({id: id}))
      return merge(user, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    getByEmail: async (email) => {
      try {
        if(!email) throw Error('Invalid email')
        var userId = await db.get(`userEmails:${email}`)
        userId = JSON.parse(userId)
        return module.exports.users.get(userId.id)
      } catch {
        return null
      }
    },
    getByUsername: async (username) => {
      try {
        if(!username) throw Error('Invalid username')
      var userId = await db.get(`usernames:${username}`)
      userId = JSON.parse(userId)
      return module.exports.users.get(userId.id)
      } catch {
        return null
      }
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    listNames: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "usernames:",
          lte: "usernames" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.username = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    searchByName: async (nameStart) => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gte: "usernames:" + nameStart,
          lt: "usernames:" + String.fromCharCode(nameStart.charCodeAt(0) + 1),
          limit: 10,
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.username = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    invite: async (id, idChannel) => {
      const data = await db.get(`users:${id}`)
      if(!data) throw Error('Unregistered channel id')
      var original = JSON.parse(data)
      if(original.channels) { original.channels.push(idChannel) }
      else                  { original.channels = [ idChannel ]}
      await db.put(`users:${id}`, JSON.stringify(original))
      return original
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}

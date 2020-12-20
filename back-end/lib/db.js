
const {v4: uuid} = require('uuid')
const {merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel, ownerEmail, invitedUsers) => {
      if(!channel.name) throw Error('Invalid channel')
      if(!ownerEmail) throw Error('Invalid owner')
      const id = uuid()
      var owner = await module.exports.users.getByEmail(ownerEmail)
      channel.ownerId = owner.id
      if(!invitedUsers) {
        invitedUsers = [owner.id]
      } else {
        invitedUsers.push(owner.id)
      }
      channel = merge(channel, { idUsers: invitedUsers})
      uniqueUsers = [...new Set(channel.idUsers)]
      channel.idUsers = uniqueUsers
      await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    get: async (id, userEmail) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      const user = await module.exports.users.getByEmail(userEmail)
      // Refuse the access if the user is not in the channel
      if(!channel.idUsers.includes(user.id)) throw Error('Unauthorized')
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
      const user = await module.exports.users.getByEmail(userEmail)
      var channels = []
      if(user.channels) {
        for(const elem  of user.channels) {
          channels.push(await module.exports.channels.get(elem, userEmail))
        }
      }
      return channels
    },
    update: async (id, channel) => {
      const original = store.channel[id]
      if(!original) throw Error('Unregistered channel id')
      store.channel[id] = merge(original, channel)
    },
    invite: async (id, channel) => {
      try {
        const data = await db.get(`channels:${id}`)
        if(!data) throw Error('Unregistered channel id')
        var original = JSON.parse(data)
        const final = merge(original, { idUsers: channel.idUsers })
        await db.put(`channels:${id}`, JSON.stringify(final))
        return final
      } catch {
        return null
      }
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
      if(!req.user.email) throw Error('Invalid user')
      const userData = await db.get(`channels:${channelId}`)
      const channel = JSON.parse(userData)
      const user = await module.exports.users.getByEmail(req.user.email)
      // Refuse the access if the user is not in the channel
      if(!channel.idUsers.includes(user.id)) throw Error('Unauthorized')
      creation = microtime.now()
      const author = await module.exports.users.getByEmail(req.user.email)
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        authorId: author.id,
        author: author.username,
        content: req.body.content,
      }))
      return merge(req.body, {creation: creation})
    },
    get: async (channelId, creation, userEmail) => {
      if(!channelId) throw Error('Invalid channel id')
      if(!creation) throw Error('Invalid message id')
      if(!userEmail) throw Error('Invalid user')
      const userData = await db.get(`channels:${channelId}`)
      const channel = JSON.parse(userData)
      const user = await module.exports.users.getByEmail(userEmail)
      // Refuse the access if the user is not in the channel
      if(!channel.idUsers.includes(user.id)) throw Error('Unauthorized')
      const data = await db.get(`messages:${channelId}:${creation}`)
      const message = JSON.parse(data)
      return merge(message, {creation: creation})
    },
    list: async (channelId, userEmail) => {
      if(!channelId) throw Error('Invalid id')
      if(!userEmail) throw Error('Invalid user')
      const data = await db.get(`channels:${channelId}`)
      const channel = JSON.parse(data)
      const user = await module.exports.users.getByEmail(userEmail)
      // Refuse the access if the user is not in the channel
      if(!channel.idUsers.includes(user.id)) throw Error('Unauthorized')
      else return new Promise( (resolve, reject) => {
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
      if(!channelId) throw Error('Invalid channel')
      if(!creation) throw Error('Invalid message')
      if(!req.user.email) throw Error('Invalid user')
      const idRequester = (await module.exports.users.getByEmail(req.user.email)).id
      var message = await module.exports.messages.get(channelId, creation, req.user.email)
      if (message.authorId == idRequester) {
        message.content = req.body.content
        await db.put(`messages:${channelId}:${creation}`, JSON.stringify(message))
        return message
      }
      else throw Error('Unauthorized')
    },
    delete: async (channelId, creation, req) => {
      if(!channelId) throw Error('Invalid channel')
      if(!creation) throw Error('Invalid message')
      if(!req.user.email) throw Error('Invalid user')
      const idRequester = (await module.exports.users.getByEmail(req.user.email)).id
      const message = await module.exports.messages.get(channelId, creation, req.user.email)
      if (message.authorId == idRequester) {
        await db.del(`messages:${channelId}:${creation}`)
        return { success: true }
      }
      else throw Error('Unauthorized')
    },
  },
  users: {
    create: async (user) => {
      try {
        if(!user.username || !user.email /*|| /*await module.exports.users.getByUsername(user.username) || await module.exports.users.getByEmail(user.email)*/) {
          throw Error('Invalid user')
        }
        const id = uuid()
        await db.put(`users:${id}`, JSON.stringify(user))
        await db.put(`usernames:${user.username}`, JSON.stringify({id: id}))
        await db.put(`userEmails:${user.email}`, JSON.stringify({id: id}))
        return merge(user, {id: id})
      } catch (error) {
        console.log("error in create user")
        return null
      }
    },
    get: async (id) => {
      try {
        if(!id) throw Error('Invalid id')
        const data = await db.get(`users:${id}`)
        const user = JSON.parse(data)
        return merge(user, {id: id})
      } catch {
        return null
      }
    },
    getByEmail: async (email) => {
      try {
        if(!email) throw Error('Invalid email')
        var userId = await db.get(`userEmails:${email}`)
        userId = JSON.parse(userId)
        return await module.exports.users.get(userId.id)
      } catch (error) {
        console.log(error)
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
      if(!id) throw Error('Missing user id')
      if(!idChannel) throw Error('Missing channel id')
      const data = await db.get(`users:${id}`)
      if(!data) throw Error('Unregistered channel id')
      var original = JSON.parse(data)
      if(original.channels) {
        original.channels.push(idChannel)
        uniqueChannels = [...new Set(original.channels)]
        original.channels = uniqueChannels
      }
      else {
        original.channels = [ idChannel ]
      }
      await db.put(`users:${id}`, JSON.stringify(original))
      return original
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  images: {
    create: async (image, ownerEmail) => {
      if(!image.name) throw Error('Invalid image')
      const id = uuid()
      //console.log("ownerEmail:"+ownerEmail)
      var owner = await module.exports.users.getByEmail(ownerEmail)
      //console.log("after call:"+owner)
      image.ownerId = owner.id
      image = merge(image)
      const data = await db.put(`images:${owner.id}`, JSON.stringify(image))
      //console.log(data)
      return merge(image, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      //var owner = await module.exports.users.getByEmail(ownerEmail)
      const data = await db.get(`images:${id}`)
      const image = JSON.parse(data)
      return merge(image, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const images = []
        db.createReadStream({
          gt: "images:",
          lte: "images" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          image = JSON.parse(value)
          image.id = key.split(':')[1]
          images.push(image)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(images)
        })
      })
    },
    update: async (id, image) => {
      const original = store.channel[id]
      if(!original) throw Error('Unregistered image id')
      store.channel[id] = merge(original, image)
    },
    //upload: async (image) => {
      //console.log(image.avatar)
      //let avatar = image.avatar;
      //avatar.mv('./uploads/' + image.name);
    //}
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}

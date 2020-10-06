
const {v4: uuid} = require('uuid') //utilisation de la syntaxe https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f
const {clone, merge} = require('mixme') //pareil. Ces fonctions permettes de d'éviter des problèmes de pointeurs...
//Création d'une "base de données" fake

//Lignes à décommenter ici permettant d'utiliser level
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => { //Syntaxe arrow function : https://javascript.info/arrow-functions-basics
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify(channel))
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
          channel.id = key
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: (id, channel) => {
      db.del(`channels:${id}`, function (err) {
        if (err)
          throw Error('Unregistered channel id')
      });
      db.put(`channels:${id}`, JSON.stringify(channel))
    },
    delete: (id) => {
      db.del(`channels:${id}`, function (err) {
        if (err)
          throw Error('Unregistered channel id')
      });
    }
  },

  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user')
      const id = uuid()
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: (id, user) => {
      db.del(`users:${id}`, function (err) {
        if (err)
          throw Error('Unregistered user id')
      });
      db.put(`users:${id}`, JSON.stringify(user))
    },
    delete: (id) => {
      db.del(`users:${id}`, function (err) {
        if (err)
          throw Error('Unregistered user id')
      });
    }
  },

  messages: {
    create: async (message, idChannel) => {
      if(!message.content) throw Error('Invalid message')
      await db.put(`channels:${idChannel}:messages:${Date.now()}`, JSON.stringify(message.content))
      return merge(message, {creation: Date.now()})
    },
    list: async (idChannel) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `channels:${idChannel}:messages:`,
          lte: `channels:${idChannel}:messages` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          startOfDate = key.split(':', 3).join(':').length; // Found here : https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
          message = new Object
          message.content = JSON.parse(value)
          message.creation = key.substring(startOfDate+1)
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    update: (date, message, idChannel) => {
      db.del(`channels:${idChannel}:messages:${date}`, function (err) {
        if (err)
          throw Error('Unregistered channel or message')
      });
      db.put(`channels:${idChannel}:messages:${Date.now()}`, JSON.stringify(message.content))
    },
    delete: (date, idChannel) => {
      db.del(`channels:${idChannel}:messages:${date}`, function (err) {
        if (err)
          throw Error('Unregistered channel or message')
      });
    }
  },

  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}

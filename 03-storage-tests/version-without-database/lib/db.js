
const {v4: uuid} = require('uuid') //utilisation de la syntaxe https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f
const {clone, merge} = require('mixme') //pareil. Ces fonctions permettes de d'éviter des problèmes de pointeurs...

//Création d'une "base de données" fake
const store =  {
  channels: {
  },
  users: {
  }
}

module.exports = {
  channels: {
    create: async (channel) => { 
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      store.channels[id] = channel
      store.channels[id].messages = []
      return merge(channel, {id: id})
    },
    list: async () => {
      return Object.keys(store.channels).map( (id) => {
        const channel = clone(store.channels[id])
        channel.id = id
        return channel
      })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    delete: (id) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    }
  },

  users: {
    create: async (user) => { 
      if(!user.username) throw Error('Invalid user')
      const id = uuid()
      store.users[id] = user
      return merge(user, {id: id})
    },
    list: async () => {
      return Object.keys(store.users).map( (id) => {
        const user = clone(store.users[id])
        user.id = id
        return user
      })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.channels[id] = merge(original, user)
    },
    delete: (id) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },

  messages: {
    create: async (message, idChannel) => {
      if(!message.content) throw Error('Invalid message')
      message.creation = Date.now()
      store.channels[idChannel].messages.push(message)
      return message
    },
    list: async (idChannel) => {
      allMessages = store.channels[idChannel].messages
      return store.channels[idChannel].messages
    },
    update: (id, message, idChannel) => {
      const channel = store.channel[idChannel]
      if(!channel) throw Error('Unregistered channel')
      const original = channel.messages[id]
      if(!original) throw Error('Unregistered message')
      store.channels[idChannel].messages[id] = merge(original, message)
    },
    delete: (id, idChannel) => {
      const channel = store.channel[idChannel]
      if(!channel) throw Error('Unregistered channel')
      const original = channel.messages[id]
      if(!original) throw Error('Unregistered message')
      delete store.channels[idChannel].messages[id]
    }
  },

  admin: {
    clear: async () => {
      store.channels = {}
      store.users = {}
    }
  }
}

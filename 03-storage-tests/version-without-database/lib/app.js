
const db = require('./db') //import de notre module db. db est un objet contenat différentes propriétés implémentées dans le module
const express = require('express') //import de express
const app = express() //lancement de express

app.use(require('body-parser').json()) //cette bibliothèque nous permet de parser le body de la requête sous le format JSON. N'oubliez pas d'effectuer des requetes avec le header Content-Type avec comme valeur application/json
//Implémentation d'une route / par défaut
app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})


// CHANNELS -----------------------------------------

//Lister tous les channels
app.get('/channels', async (req, res) => {
  const channels = await db.channels.list() //On appel la fonction list de notre module "db" qui va nous retourner tous les channels stockés en base de données
  res.json(channels) //On renvoie du json en sortie
})

//Créer un channel
app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel) //petite spécificité ici, on précise le status code 201. Pour apprendre plus sur les status code : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
})

//Syntaxe async/await : https://blog.engineering.publicissapient.fr/2017/11/14/asyncawait-une-meilleure-facon-de-faire-de-lasynchronisme-en-javascript/

//Voir un channel
app.get('/channels/:id', (req, res) => {
  const channel = db.channels.get(req.body)
  res.json(channel)
})

//Modifier un channel
app.put('/channels/:id', (req, res) => {
  const channel = db.channels.update(req.body)
  res.json(channel)
})


// USERS --------------------------------------------

// Lister les users
app.get('/users', async (req, res) => {
  const user = await db.users.list()
  res.json(user) 
})

// Créer un user
app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

// Voir un user
app.get('/users/:id', (req, res) => {
  const user = db.users.get(req.body)
  res.json(user)
})

//Modifier un user
app.put('/users/:id', (req, res) => {
  const user = db.users.update(req.body)
  res.json(user)
})

// MESSAGES -----------------------------------------

// Lister les messages d'un channel
app.get('/channels/:idChannel/messages', async (req, res) => {
  const message = await db.messages.list(req.params.idChannel)
  res.json(message) 
})

// Créer un message dans un channel
app.post('/channels/:idChannel/messages', async (req, res) => {
  const message = await db.messages.create(req.body, req.params.idChannel)
  res.status(201).json(message)
})

// Voir un message d'un channel
app.get('/channels/:idChannel/messages/:idMessage', (req, res) => {
  const message = db.messages.get(req.body)
  res.json(message)
})

//Modifier un message
app.put('/channels/:idChannel/messages/:idMessage', (req, res) => {
  const user = db.messages.update(req.params.idMessage, req.body, req.params.idChannel)
  res.json(user)
})


module.exports = app

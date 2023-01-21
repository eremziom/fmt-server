const express = require('express')
const mongoose = require('mongoose')
const { mongoDBPass, mongoAddress, serverURI } = require('./config.js')

const movieRoutes = require('./routes/movie.routes.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(`${serverURI}`, movieRoutes)

app.use(`${serverURI}`, (req, res) => {
  res.status(404).send({message: 'Sorry, address was not found...'})
})

mongoose.set("strictQuery", false)
mongoose.connect(`mongodb+srv://${mongoDBPass}${mongoAddress}`, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.once('open', () => {
  console.log('Successfully connected to the database')
})
db.on('error', err => console.log('Error: ' + err))

const port = process.env.PORT || 8000
app.listen(port, 'localhost', () => {
  console.log('Server is running on port : '+ port)
})
 
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { mongoDBPass, mongoAddress, serverURI } = require('./config.js')

const movieRoutes = require('./routes/movie.routes.js')
const getmovieRoutes = require('./routes/getmovie.routes.js')
const userRoutes = require('./routes/user.routes.js')
const testRoutes = require('./routes/test.routes.js')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(`${serverURI}`, movieRoutes)
app.use(`${serverURI}`, getmovieRoutes)
app.use(`${serverURI}`, userRoutes)
app.use(`${serverURI}`, testRoutes)

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
 
const express = require('express')
const router = express.Router()
const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

router.get('/users', async (req, res) => {
  try {
    const result = await User
    .find()
    if(!result) res.status(404).json({post: 'Not found...'})
    else 
      res.json(result)

  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const result = await User
    .findById(req.params.id)
    if(!result) res.status(404).json({message: 'Not found...'})
    else res.json(result)
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.post('/register', async (req, res) => {
  try {
    const { login, password, isAdmin } = req.body

    if (!(login && password && isAdmin)) {
      res.status(400).send("Login, Password or idAdmin is missing")
    }

    const oldUser = await User.findOne({ login })

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login")
    }

    encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      login: login,
      password: encryptedPassword,
      isAdmin: isAdmin
    })

    let token_key = config.jwt_token
    const token = jwt.sign(
      { user_id: newUser._id, login },
      token_key,
      {
        expiresIn: "2h",
      }
    );
    newUser.token = token
    console.log(newUser)
    res.status(201).json(newUser)
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body

    if (!(login && password)) {
      res.status(400).send("Login or Password is missing")
    }

    const user = await User.findOne({ login })

    if(user && (await bcrypt.compare(password, user.password))){
      let token_key = config.jwt_token
      const token = jwt.sign(
        { user_id: user._id, login },
        token_key,
        {
          expiresIn: "1m",
        }
      )
      user.token = token
      user.password = undefined
      res.status(201).json(user)
    } else {
      res.status(400).json('Invalid credentials')
    }
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.post('/verify', auth, async(req, res) => {
  try {
    console.log(req.user)
    const login = req.user.login
    console.log(login)
    const user = await User.findOne({ login })

    let token_key = config.jwt_token
      const token = jwt.sign(
        { user_id: user._id, login },
        token_key,
        {
          expiresIn: "1m",
        }
      )
      user.token = token
      user.password = undefined
      res.status(200).json(user)
  }
  catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router
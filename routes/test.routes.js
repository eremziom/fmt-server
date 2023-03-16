const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/test', auth, async (req, res) => {
  res.status(200).send("Welcome 🙌 ");
})

module.exports = router
const express = require('express')
const router = express.Router()
const {go} = require('../scrapers/scrap')

// router.get('/getmovie', async (req, res) => {
//   try {
//     console.log('works')
//     go()
//     res.json({message: 'WORKS'})
//   }
//   catch(err) {
//     res.status(500).json(err)
//   }
// })

router.post('/getmovie', async (req, res) => {
  try {
    const {link} = req.body
    const movie = await go(link)
    res.json(movie)
  }
  catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router
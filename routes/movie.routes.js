const express = require('express')
const router = express.Router()
const Movie = require('../models/movie.model.js')

router.get('/movies', async (req, res) => {
  try {
    const result = await Movie
    .find()
    if(!result) res.status(404).json({post: 'Not found...'})
    else 
      res.json(result)

  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.get('/movies/:id', async (req, res) => {
  try {
    const result = await Movie
    .findById(req.params.id)
    if(!result) res.status(404).json({message: 'Not found...'})
    else res.json(result)
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.post('/movies', async (req, res) => {
  try {
    const { title, description, duration, year, type, author } = req.body
    const newMovie = new Movie({title: title, description: description, duration: duration, year: year, type: type, author: author})
    await newMovie.save()
    res.json({message: 'Add Movie Success'})
  }
  catch(err) {
    res.status(500).json(err)
  }
})

router.put('/movies/:id', async (req, res) => {
  try {
    const { title, description, duration, year, type, author } = req.body
    const edition = await Movie.findById(req.params.id)
    if(!edition) res.status(404).json({message: 'Not found...'})
    else{
      await Movie.updateOne({ _id: req.params.id}, {$set: {title: title, description: description, duration: duration, year: year, type: type, author: author}})
      res.json({message: 'Movie updated successfuly'})
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
})

router.delete('/movies/:id', async (req, res) => {
  try {
    const result = await Movies.findById(req.params.id);
    if(!result) res.status(404).json({post: 'Not found...'});
    else {
      await Movie.deleteOne({_id: req.params.id});
      res.json({message: 'Movie Deleted'});
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})

module.exports = router
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema ({
    title: {type: String, require: true},
    description: {type: String},
    duration: {type: Number},
    year: {type: Number},
    type: {type: String},
    author: {type: String, require: true}
})

module.exports = mongoose.model('Movie', movieSchema)
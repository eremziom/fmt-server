const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    login: {type: String, require: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true, default: false},
    token: {type: String}
})

module.exports = mongoose.model('User', userSchema)
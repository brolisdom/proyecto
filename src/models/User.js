const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    _email: {
        type: String,
        require: true
    },
    _password: {
        type: String,
        require: true
    },
    _name: {
        type: String,
    },
    _tel: {
        type: String,
    },
    _date: {
        type: String,
    },
    _country: {
        type: String,
    },
    _scholar: {
        type: String,
    },
    _degree: {
        type: String,
    },
    _team: {
        type: String,
    },
    _status: {
        type: String,
    }
})

module.exports = model('User', UserSchema)
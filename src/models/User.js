const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    _email: {
        type: String,
        require: true
    },
    _password: {
        type: String,
    },
    _name: {
        type: String,
    },
    _surname: {
        type: String,
    },
    _occupation: {
        type: String,
    },
    _tel: {
        type: String,
    },
    _date: {
        type: String,
    },
    _gender: {
        type: String,
    },
    _country: {
        type: String,
    },
    _scholarship: {
        type: String,
    },
    _institution: {
        type: String,
    },
    _school: {
        type: String,
    },
    _team: {
        type: String,
        // unique
    },
    _status: {
        type: String,
    },
    _verified: {
        type: Boolean,
    },
    _completed: {
        type: Boolean,
    },
    _facebookID: {
        type: String
    },
    _googleID: {
        type: String
    }
})

module.exports = model('User', UserSchema)
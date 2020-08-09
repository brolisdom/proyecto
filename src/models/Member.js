const { Schema, model } = require('mongoose')

const MemberSchema = new Schema({
    _leader: {
        type: String,
        require: true
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
    _scholar: {
        type: String,
    },
    _institution: {
        type: String,
    },
    _school: {
        type: String,
    },
    _status: {
        type: String,
    },
    _robots: {
      type: Array  
    },
})

module.exports = model('Member', MemberSchema)
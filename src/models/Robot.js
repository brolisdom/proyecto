const { Schema, model } = require('mongoose')

const RobotSchema = new Schema({
    _leader: {
        type: String,
        require: true
    },
    _name: {
        type: String,
        require: true
    },
    _category: {
        type: String,
        require: true
    },
    _price: {
        type: Number,
    },
    _members: {
        type: Array,
    },
    _status: {
        type: String,
    },
    _team: {
        type: String
    }
})

module.exports = model('Robot', RobotSchema)
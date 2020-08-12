const { Schema, model } = require('mongoose')

const RobotSchema = new Schema({
    _leader: {
        type: String,
        require: true
    },
    _name: {
        type: String,
    },
    _category: {
        type: String,
    },
    _price: {
        type: Number,
    },
    _status: {
        type: String,
    },
    _discount: {
        type: String,
        // pdf
    },
    _prototype: {
        type: String,
        // image
    },
    _captain: {
        type: String,
    },
    _members: {
        type: Array,
    },
    _idMember: {
        type: Array
    }
})

module.exports = model('Robot', RobotSchema)
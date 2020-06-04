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
    _status: {
        type: String,
    },
    _members: {
        type: Array,
    }
})

module.exports = model('Robot', RobotSchema)
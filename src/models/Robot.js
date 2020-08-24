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
    _payment: {
        type: String,
    },
    _prototype: {
        type: String,
    },
    _captain: {
        type: Schema.Types.Mixed,
    },
    _member1: {
        type: Schema.Types.Mixed,
    },
    _member2: {
        type: Schema.Types.Mixed,
    },
    _member3: {
        type: Schema.Types.Mixed,
    },

})

module.exports = model('Robot', RobotSchema)
const { Schema, model } = require('mongoose')

const MemberSchema = new Schema({
    _leader: {
        type: String,
        require: true
    },
    _name: {
        type: String,
    },
    _status: {
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
    }
})

module.exports = model('Member', MemberSchema)
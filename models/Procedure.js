const {Schema, model} = require('mongoose');

const procedureSchema = new Schema({
    durationMinutes: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = model('Procedure', procedureSchema)

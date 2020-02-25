const {Schema, model} = require('mongoose');

const eventSchema = new Schema({
    date: {
        type: String,
        required: true
    }, //Format: 'YYYY-MM-DD'; TODO: Maybe I could use startTime to find out date as well
    title: {
        type: String,
        required: true
    },
    comment: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    startTime: {
        type: String,
        required: true
    }, //Format: 'HH:mm'; must be equal to quoters. I.e. 00:15, 00:30, 00:45, 00:00
    durationMinutes: {
        type: String,
        required: true
    }
});

module.exports = model('Event', eventSchema)

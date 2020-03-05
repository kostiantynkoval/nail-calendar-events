const {Schema, model} = require('mongoose');

const technicianSchema = new Schema({
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    procedures: [{
        type: Schema.Types.ObjectId,
        ref: 'Procedure',
        required: true
    }]
});

module.exports = model('Technician', technicianSchema)

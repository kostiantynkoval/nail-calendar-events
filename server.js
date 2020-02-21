const express = require('express')
const mongoose = require('mongoose')

const app = express()

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@naileventscluster-3s2t9.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to MongoDB!")
        app.listen(5000, () => console.log('App listening on port', app))
    } catch (e) {
        console.log('Server Error:', e)
        process.exit(1)
    }
}

connect()



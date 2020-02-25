const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const app = express()

const PORT = config.get('port') || 5000

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(express.json({ extended: true }))

app.use('/auth', require('./routes/auth.routes'))
app.use('/events', require('./routes/events.routes'))

mongoose.connect(config.get('mongoUri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connected to MongoDB!')
        app.listen(PORT, () => console.log('App listening on port ' + PORT))
    })
    .catch(e => {
        console.log('Server Error:', e)
        process.exit(1)
    })



const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req,res,next) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            res.status(401).json({message: 'Not authorized'})
        }

        req.user = jwt.verify(token, config.get('secretJWT'))

        next()
    } catch (e) {
        res.status(401).json({message: 'Not authorized'})
    }
}

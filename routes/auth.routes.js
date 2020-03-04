const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = Router()

router.post(
    '/register',
    [
        check('email').isEmail(),
        check('password').isLength({ min: 8 }),
        check('firstName').not().isEmpty(),
        check('lastName').not().isEmpty()
    ],
    async (req, res) => {
        try {
            const { errors } = validationResult(req)
            if ( errors.length ) {
                return res.status(422).json({ errors })
            }

            const user = req.body

            const candidate = await User.findOne({ email: user.email })

            if ( candidate ) {
                return res.status(409).json({ message: 'Uer already exists' })
            }

            const hashedPassword = await bcrypt.hash(user.password, config.get('saltRounds'))

            const newUser = new User({
                email: user.email,
                password: hashedPassword,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin ? user.isAdmin : false
            })

            await newUser.save()

            return res.status(201).json({ message: "User successfully created" })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

router.post(
    '/login',
    [
        check('email').isEmail(),
        check('password').isLength({ min: 8 })
    ],
    async (req, res) => {
        try {
            const { errors } = validationResult(req)
            if ( errors.length ) {
                return res.status(422).json({ errors })
            }

            const user = await User.findOne({ email: req.body.email })

            if ( !user ) {
                return res.status(401).json({ message: 'Username or password is invalid' })
            }

            const isMatchedPasswords = await bcrypt.compare(req.body.password, user.password)

            if ( !isMatchedPasswords ) {
                return res.status(401).json({ message: 'Username or password is invalid' })
            }

            const userToJWT = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }

            const token = jwt.sign(userToJWT, config.get('secretJWT'), { expiresIn: '1h' })
            return res.json({ token, userId: user.id, initials: user.firstName.charAt(0) + user.lastName.charAt(0) })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

module.exports = router

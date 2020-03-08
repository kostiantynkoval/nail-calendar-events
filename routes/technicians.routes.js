const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Technician = require('../models/Technician')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.get(
    '/',
    async (req, res) => {
        try {
            const technicians = await Technician.find()
            return res.json({ technicians })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

router.post(
    '/create',
    [
        check('firstName').not().isEmpty(),
        check('procedures').not().isEmpty()
    ],
    auth,
    async (req, res) => {
        try {
            const { errors } = validationResult(req)
            if ( errors.length ) {
                return res.status(422).json({ errors })
            }
            if ( req.user.isAdmin ) {
                const { firstName, lastName, email, phone, procedures } = req.body
                const technician = new Technician({
                    firstName,
                    lastName,
                    email,
                    phone,
                    procedures
                })
                await technician.save()
                return res.status(201).json({ message: 'Technician successfully created' })
            } else {
                return res.status(403).json({ message: 'Not authorized' })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
)

module.exports = router

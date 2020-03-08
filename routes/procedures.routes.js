const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Procedure = require('../models/Procedure')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.get(
    '/',
    async (req, res) => {
        try {
            const procedures = await Procedure.find()
            return res.json({ procedures })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

router.post(
    '/create',
    [
        check('title').not().isEmpty(),
        check('cost').not().isEmpty(),
        check('cost').isFloat(),
        check('durationMinutes').not().isEmpty()
    ],
    auth,
    async (req, res) => {
        try {
            const { errors } = validationResult(req)
            if ( errors.length ) {
                return res.status(422).json({ errors })
            }
            if(req.user.isAdmin) {
                const {title, cost, description, durationMinutes} = req.body
                const procedure = new Procedure({
                    title,
                    description,
                    cost,
                    durationMinutes,
                })
                await procedure.save()
                return res.status(201).json({ message: "Procedure successfully created" })
            } else {
                return res.status(403).json({ message: "Not authorized" })
            }
        } catch (e) {
            console.log(e)
            if (e.name === 'MongoError' && e.code === 11000) {
                return res.status(409).json({ message: "There is procedure with same title already" })
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
)

module.exports = router

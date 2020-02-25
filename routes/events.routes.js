const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const config = require('config')
const Event = require('../models/Event')
const auth = require('../middlewares/auth.middleware')

const router = Router()

router.get(
    '/:date',
    async (req, res) => {
        try {
            const events = await Event.find({date: req.params.date})
            return res.json({ events })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

router.post(
    '/:date/create',
    auth,
    async (req, res) => {
        try {
            const {title, comment, startTime, durationMinutes} = req.body

            const event = new Event({
                date: req.params.date,
                title,
                comment,
                startTime,
                durationMinutes,
                owner: req.user.id
            })
            await event.save()
            return res.status(201).json({ message: "Event successfully created" })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

module.exports = router

const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const moment = require('moment')
const config = require('config')
const Event = require('../models/Event')
const auth = require('../middlewares/auth.middleware')
const isTaskOverlaps = require('../utils/isTaskOverlaps')

const router = Router()

router.get(
    '/:date',
    async (req, res) => {
        try {
            const events = await Event.find({date: req.params.date})
            console.log(req.params.date)
            console.log(events)
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
            const date = req.params.date
            const events = await Event.find({date})

            const {title, comment, startTime, durationMinutes, technicianID} = req.body
            const startTaskTime = moment()
                .startOf('day')
                .year(Number(date.slice(0,4)))
                .month(Number(date.slice(5,7)) - 1)
                .date(Number(date.slice(8)))
                .hours(Number(startTime.slice(0,2)))
                .minutes(Number(startTime.slice(3)))
            const endTaskTime = startTaskTime.clone().add(Number(durationMinutes), 'minutes')

            if (!isTaskOverlaps(startTaskTime, endTaskTime, events)) {
                const event = new Event({
                    date: req.params.date,
                    title,
                    comment,
                    startTime,
                    durationMinutes,
                    owner: req.user.id,
                    technicianID
                })
                await event.save()
                return res.status(201).json({ message: "Event successfully created" })
            } else {
                return res.status(409).json({ message: "Event overlaps another event or out of working hours" })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

module.exports = router

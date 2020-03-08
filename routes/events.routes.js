const { Router } = require('express')
const moment = require('moment')
const Event = require('../models/Event')
const auth = require('../middlewares/auth.middleware')
const isTaskOverlaps = require('../utils/isTaskOverlaps')

const router = Router()

router.get(
  '/:date/:technicianId',
  async(req, res) => {
    try {
      const events = await Event.find({ date: req.params.date, technicianId: req.params.technicianId })
      return res.json({ events })
    } catch(e) {
      console.log(e)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
)

router.post(
  '/:date/create',
  auth,
  async(req, res) => {
    try {
      const date = req.params.date
      const { title, comment, startTime, durationMinutes, technicianId } = req.body
      const events = await Event.find({ date, technicianId })
      const startTaskTime = moment()
        .startOf('day')
        .year(Number(date.slice(0, 4)))
        .month(Number(date.slice(5, 7)) - 1)
        .date(Number(date.slice(8)))
        .hours(Number(startTime.slice(0, 2)))
        .minutes(Number(startTime.slice(3)))
      const endTaskTime = startTaskTime.clone().add(Number(durationMinutes), 'minutes')
      
      if(!isTaskOverlaps(startTaskTime, endTaskTime, events)) {
        const event = new Event({
          date: req.params.date,
          title,
          comment,
          startTime,
          durationMinutes,
          owner: req.user.id,
          technicianId
        })
        await event.save()
        return res.status(201).json({ message: 'Event successfully created' })
      } else {
        return res.status(409).json({ message: 'Event overlaps another event or out of working hours' })
      }
    } catch(e) {
      console.log(e)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
)

router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const _id = req.params.id
  
      const removed = await Event.remove(
        { _id },
        { justOne: true }
      )
      console.log('removed', removed)
      return res.status(200).json({ message: 'Event successfully removed' })
    } catch(e) {
      console.log(e)
      res.status(500).json({ message: 'Internal server error' })
    }
    
  }
)

module.exports = router

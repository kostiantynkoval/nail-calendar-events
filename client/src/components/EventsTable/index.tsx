import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import { ChosenDate, Technicians } from '../Dashboard'
import { User } from '../../App'
import AddEventForm from '../AddEventForm'
import { Event } from '../../interfaces/Event'
import './EventsTable.scss'


const Events = () => {
  const [events, setEvents]: [Event[], Dispatch<SetStateAction<Event[]>>] = useState<Event[]>([])
  const [busySlots, setBusySlots]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  const [currentTimeSlot, setCurrentTimeSlot]: [string, Dispatch<SetStateAction<string>>] = useState<string>('')
  const { chosenDate } = useContext(ChosenDate)
  const { selectedTechnician } = useContext(Technicians)
  const { user } = useContext(User)
  
  const timeTable: Array<string> = new Array(32).fill(0).map((item, i) =>
    chosenDate.clone().startOf('day').set('minute', 600 + i * 15).format('HH:mm')
  )
  
  const closeAddEventForm = () => {
    setIsFormOpen(false)
  }
  
  const openAddEventForm = (timeSlot: string) => {
    setCurrentTimeSlot(timeSlot)
    setIsFormOpen(true)
  }
  
  function submitAddEventForm(form: any): Promise<any> {
    
    const body = {
      ...form,
      startTime: currentTimeSlot,
      owner: user?.userId,
      technicianID: selectedTechnician._id
    }
    return fetch(`/events/${chosenDate.clone().format('YYYY-MM-DD')}/create`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
      })
  }
  
  const getBusySlots = (events: Event[]): string[] => {
    return events.reduce((acc: string[], event: Event) => {
      const slotsQuantity = Number(event.durationMinutes) / 15
      new Array(slotsQuantity).fill('').forEach((slot, i) => {
        acc.push(moment(chosenDate).set({
          'hours': Number(event.startTime.slice(0, 2)),
          'minutes': Number(event.startTime.slice(3))
        }).add(i * 15, 'minutes').format('HH:mm'))
      })
      return acc
    }, [])
  }
  
  useEffect(() => {
    fetch(`/events/${chosenDate.format('YYYY-MM-DD')}`)
      .then(res => res.json())
      .then(events => events.events)
      .then(events => {
        setEvents(events)
        setBusySlots(getBusySlots(events))
        // const userId = '5e5694ec640e6a38d0dd3568' || localStorage.getItem('userId')
      })
  }, [chosenDate])
  
  const isFutureTime = (chosenDate: moment.Moment, chosenTimeSlot: string): boolean => {
    const plannedStartTime = chosenDate
      .clone()
      .startOf('day')
      .hours(Number(chosenTimeSlot.slice(0, 2)))
      .minutes(Number(chosenTimeSlot.slice(3)))
    return plannedStartTime.isAfter(moment())
  }
  
  return (
    <section className="timeline-container">
      <Typography variant="h6" component="span" display="inline">Current date</Typography>
      <Typography variant="body1" component="span" display="inline">{chosenDate.format('MMMM, DD')}</Typography>
      <AddEventForm isFormOpen={isFormOpen} handleClose={closeAddEventForm} submitForm={submitAddEventForm}/>
      {
        timeTable.map((timeSlot: string) => (
          <List
            key={timeSlot}
            component="div"
            disablePadding={true}
            dense={true}
          >
            <ListItem divider>
              <ListItemText className="timeline-row" primary={timeSlot}/>
              {
                events.map(event => {
                  if(event.startTime === timeSlot) {
                    const durationSlots = Number(event.durationMinutes) / 15
                    return (
                      <Card
                        style={{ height: durationSlots * 57 }}
                        className='event'
                        key={event.startTime}
                        variant="outlined">
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            {event.title}
                          </Typography>
                          {
                            Number(event.durationMinutes) >= 45 && (
                              <Typography color="textSecondary">
                                From: {event.startTime} To: {moment(chosenDate).set({
                                'hours': Number(event.startTime.slice(0, 2)),
                                'minutes': Number(event.startTime.slice(3))
                              }).add(Number(event.durationMinutes), 'minutes').format('HH:mm')}
                              </Typography>
                            )
                          }
                        </CardContent>
                        <CardActions>
                          <Button variant="outlined" color="secondary" size="small">Remove</Button>
                        </CardActions>
                      </Card>
                    )
                  } else {
                    return null
                  }
                })
              }
              {
                isFutureTime(chosenDate, timeSlot) && user?.token && !busySlots.includes(timeSlot) ? (
                  <IconButton onClick={() => openAddEventForm(timeSlot)} edge="end" aria-label="add">
                    <Add/>
                  </IconButton>
                ) : (
                  <div style={{ height: 48 }}/>
                )
              }
            
            </ListItem>
          </List>
        ))
      }
    </section>
  )
}

export default Events

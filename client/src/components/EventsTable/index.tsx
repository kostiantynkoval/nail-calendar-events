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
import { ChosenDate } from '../Dashboard'
import {Event} from '../../interfaces/Event'
import './EventsTable.scss'



const Events = () => {
    const [events, setEvents]: [Event[], Dispatch<SetStateAction<Event[]>>] = useState<Event[]>([])
    const [busySlots, setBusySlots]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([])
    const { chosenDate } = useContext(ChosenDate)
    const timeTable: Array<string> = new Array(32).fill(0).map((item, i) =>
        chosenDate.clone().startOf('day').set('minute', 600 + i * 15).format('HH:mm')
    )

    const getBusySlots = (events: Event[]): string[] => {
        return events.reduce((acc: string[], event: Event) => {
            const slotsQuantity = +event.durationMinutes / 15
            new Array(slotsQuantity).fill('').forEach((slot,i) => {
                acc.push(moment(chosenDate).set({
                    'hours': +event.startTime.slice(0, 2),
                    'minutes': +event.startTime.slice(3)
                }).add(i*15, 'minutes').format('HH:mm'))
            })
            return acc
        }, [])
    }

    useEffect(() => {
        fetch(`/events/${chosenDate.format('YYYY-MM-DD')}`, {
            headers: {
                'Authorization': 'sss eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTY4YWZmMDMxZTQ3MjVmODMxZTQyZiIsImZpcnN0TmFtZSI6IlFxcSIsImxhc3ROYW1lIjoiUXFxcSIsImVtYWlsIjoicXFAcXEucXEiLCJpYXQiOjE1ODI3OTQ0NzUsImV4cCI6MTU4Mjc5ODA3NX0.4VuyDqqsPnuDbbgW9IB82NeZWbkpICQUz8lHNyE8O24'
            }
        })
            .then(res => res.json())
            .then(events => events.events)
            .then(events => {
                setEvents(events)
                setBusySlots(getBusySlots(events))
                // const userId = '5e5694ec640e6a38d0dd3568' || localStorage.getItem('userId')
            })
    }, [chosenDate])

    return (
        <section className="timeline-container">
            <Typography variant="h6" component="span" display="inline">Current date</Typography>
            <Typography variant="body1" component="span" display="inline">{chosenDate.format('MMMM, DD')}</Typography>
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
                                    if ( event.startTime === timeSlot ) {
                                        const durationSlots = parseInt(event.durationMinutes) / 15
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
                                                    <Typography color="textSecondary">
                                                        From: {event.startTime} To: {moment(chosenDate).set({
                                                        'hours': +event.startTime.slice(0, 2),
                                                        'minutes': +event.startTime.slice(3)
                                                    }).add(+event.durationMinutes, 'minutes').format('HH:mm')}
                                                    </Typography>
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
                                !busySlots.includes(timeSlot) ? (
                                    <IconButton edge="end" aria-label="add">
                                        <Add />
                                    </IconButton>
                                ) : (
                                    <div style={{height: 48}}/>
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

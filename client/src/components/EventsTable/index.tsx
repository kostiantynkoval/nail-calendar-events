import React, { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import {ChosenDate} from '../Dashboard'
import './EventsTable.scss'

const Events = () => {
    const [events, setEvents]: [any[], Dispatch<SetStateAction<any>>] = useState([])
    const {chosenDate} = useContext(ChosenDate)
    const timeTable = new Array(32).fill(0).map((item, i) => (
        <div key={i}>
            {chosenDate.clone().startOf('day').set('minute', 600 + i * 15).format('HH:mm')}
        </div>
    ))
    console.log('timeTable', timeTable)

    useEffect(() => {
        fetch(`/events/${chosenDate.format('YYYY-MM-DD')}`, {
            headers: {
                'Authorization': 'sss eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTY4YWZmMDMxZTQ3MjVmODMxZTQyZiIsImZpcnN0TmFtZSI6IlFxcSIsImxhc3ROYW1lIjoiUXFxcSIsImVtYWlsIjoicXFAcXEucXEiLCJpYXQiOjE1ODI3Mjk5OTYsImV4cCI6MTU4MjczMzU5Nn0.r-ce_OYli2Plk2TfbkVoNVDnuj1UZOW37VYqDBZI6tQ'
            }
        }).then(res => res.json()).then(events => events.events).then(events => setEvents(events))
    }, [chosenDate])

    return (
        <section>
            {timeTable}
            {console.log('events', events)}
        </section>
    )
}

export default Events

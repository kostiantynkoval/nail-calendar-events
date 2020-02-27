import React, { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { ChosenDate } from '../Dashboard'
import './EventsTable.scss'

interface EventTimed {
    isLoggedUserEvent: boolean
    isStart: boolean
    isEnd: boolean
    isMiddle: boolean
    title?: string
    begins?: string
    ends?: string
}

const Events = () => {
    const [events, setEvents]: [any[], Dispatch<SetStateAction<any>>] = useState([])
    const [eventsTimed, setEventsTimed]: [Map<string, EventTimed>, Dispatch<SetStateAction<Map<string, EventTimed>>>] = useState(new Map())
    const { chosenDate } = useContext(ChosenDate)
    const timeTable: Array<string> = new Array(32).fill(0).map((item, i) =>
        chosenDate.clone().startOf('day').set('minute', 600 + i * 15).format('HH:mm')
    )
    console.log('timeTable', timeTable)

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
                const userId = '5e5694ec640e6a38d0dd3568' || localStorage.getItem('userId')
                // const eventsTimed = timeTable.reduce((acc, time) => {
                //     const currentTime = moment(chosenDate).set({ hour: +time.slice(0, 2), minute: +time.slice(3) })
                //     let isLoggedUserEvent = false
                //     let isStart = false
                //     let isMiddle = false
                //     let isEnd = false
                //
                //     for (let event of events) {
                //         const eventStartTime = moment(event.date).set({
                //             hour: +event.startTime.slice(0, 2),
                //             minute: +event.startTime.slice(3)
                //         })
                //         const eventFinishTime = eventStartTime.clone().add(+event.durationMinutes, 'minutes')
                //         if ( currentTime.isSameOrAfter(eventStartTime) && currentTime.isSameOrBefore(eventFinishTime) ) {
                //             isLoggedUserEvent = userId === event.owner
                //             isStart = currentTime.isSame(eventStartTime)
                //             isEnd = currentTime.isSame(eventFinishTime)
                //             isMiddle = !isStart && !isEnd
                //
                //             acc.set(currentTime.format('HH:mm'), {
                //                 isLoggedUserEvent,
                //                 isStart,
                //                 isEnd,
                //                 isMiddle
                //             })
                //         }
                //     }
                //     return acc
                // }, new Map())
                // setEventsTimed(eventsTimed)
                // console.log('eventsTimed', eventsTimed)

            })
    }, [chosenDate])

    return (
        <section>
            {
                timeTable.map((timeSlot: string) => (
                    <div key={timeSlot} className="timeline-row">
                        <div>{timeSlot}</div>

                        {
                            events.map(event => {
                                if ( event.startTime === timeSlot ) {
                                    const durationSlots = parseInt(event.durationMinutes)/15
                                    return (
                                        <div
                                            style={{ height: durationSlots * 24 + durationSlots}}
                                            className='event'
                                            key={event.startTime}
                                        >
                                            <span>{event.title}</span>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })
                        }

                    </div>
                ))
            }
            {console.log('events', events)}
        </section>
    )
}

export default Events

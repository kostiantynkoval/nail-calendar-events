import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import moment from 'moment'
import './DaysHandler.scss'

interface DaysHandlerProps {
    currentDate: moment.Moment
}

interface Week {
    days: Day[]
}

interface Day {
    value: moment.Moment
    isToday: boolean
    isAnotherMonth: boolean
    isSelected: boolean
}

const DaysHandler: React.SFC<DaysHandlerProps> = ({ currentDate }) => {

    const [calendar, setCalendar]: [Week[], Dispatch<SetStateAction<Week[]>>] = useState<Week[]>([])

    useEffect(() => {
        const startDayOfMonthScope = currentDate.clone().startOf('month').startOf('week')
        const endDayOfMonthScope = currentDate.clone().endOf('month').endOf('week')

        const date = startDayOfMonthScope.clone().subtract(1, 'day')
        const calendar: Week[] = []

        while (date.isBefore(endDayOfMonthScope, 'day')) {
            calendar.push({
                days: Array(7)
                    .fill(0)
                    .map(() => {
                        const value = date.add(1, 'day').clone()
                        const isToday = moment().isSame(value, 'date')
                        const isAnotherMonth = !currentDate.isSame(value, 'month')
                        const isSelected = currentDate.isSame(value, 'date')

                        return {
                            value,
                            isToday,
                            isAnotherMonth,
                            isSelected
                        }
                    })
            })
        }
        setCalendar(calendar)
    }, [currentDate])

    const renderCalendar = () => {

    }

    return (
        <table>
            <thead>
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
            </thead>
            <tbody>
            {
                console.log('cal', calendar)
            }
            {
                calendar.map((week,i) => (
                    <tr key={i}>
                        {
                            week.days.map((day, j) => (
                                <td key={i.toString() + j.toString()}>
                                    <span>{day.value.format('DD')}</span>
                                </td>
                            ))
                        }

                    </tr>
                ))
            }

            </tbody>
        </table>
    )
}

export default DaysHandler

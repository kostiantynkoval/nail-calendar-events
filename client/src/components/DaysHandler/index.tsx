import React, { Dispatch, SetStateAction, useEffect, useState, useContext } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import {ChosenDate} from '../Dashboard'
import './DaysHandler.scss'

interface DaysHandlerProps {
    currentMonth: moment.Moment,
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

const DaysHandler: React.SFC<DaysHandlerProps> = ({ currentMonth }) => {

    const [calendar, setCalendar]: [Week[], Dispatch<SetStateAction<Week[]>>] = useState<Week[]>([])
    const {chosenDate, changeChosenDate} = useContext(ChosenDate)

    const changeDate = (date: Day) => {
        if(!date.isAnotherMonth) {
            changeChosenDate(date.value)
        }
    }

    useEffect(() => {
        const startDayOfMonthScope = currentMonth.clone().startOf('month').startOf('week')
        const endDayOfMonthScope = currentMonth.clone().endOf('month').endOf('week')

        const date = startDayOfMonthScope.clone().subtract(1, 'day')
        const calendar: Week[] = []

        while (date.isBefore(endDayOfMonthScope, 'day')) {
            calendar.push({
                days: Array(7)
                    .fill(0)
                    .map(() => {
                        const value = date.add(1, 'day').clone()
                        const isToday = moment().isSame(value, 'date')
                        const isAnotherMonth = !currentMonth.isSame(value, 'month')
                        const isSelected = chosenDate.isSame(value, 'date')

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
    }, [currentMonth, chosenDate])

    return (
        <section className="table-wrapper">
            <main>
                <header>
                    <strong>Sun</strong>
                    <strong>Mon</strong>
                    <strong>Tue</strong>
                    <strong>Wed</strong>
                    <strong>Thu</strong>
                    <strong>Fri</strong>
                    <strong>Sat</strong>
                </header>

                {
                    calendar.map((week,i) => (
                        <div className="table-row" key={i}>
                            {
                                week.days.map((day, j) => (
                                    <span
                                        className={classNames('table-cell', {disabled: day.isAnotherMonth})}
                                        key={i.toString() + j.toString()}
                                        onClick={() => changeDate(day)}
                                    >
                                        <span
                                            className={classNames({
                                                active: day.isToday,
                                                selected: day.isSelected
                                            })}
                                        >{day.value.format('DD')}</span>
                                    </span>
                                ))
                            }

                        </div>
                    ))
                }


            </main>
        </section>

    )
}

export default DaysHandler

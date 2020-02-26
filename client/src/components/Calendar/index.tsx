import React, {Fragment, useState} from 'react'
import moment from 'moment'
import MonthHandler from '../MonthHandler'
import DaysHandler from '../DaysHandler'

const Calendar = () => {

    const [displayedMonth, setDisplayedMonth] = useState(moment())
    const [displayedDate, setDisplayedDate] = useState(moment())

    const changeMonth = (direction: number) => {
        setDisplayedMonth(displayedMonth.add(direction, 'months').clone())
    }

    const changeDate = (date: moment.Moment) => {
        setDisplayedDate(date.clone())
    }

    return (
        <Fragment>
            <MonthHandler changeMonth={changeMonth} currentMonth={displayedMonth.format('MMMM')}/>
            <DaysHandler setDate={changeDate} currentMonth={displayedMonth} currentDate={displayedDate} />
        </Fragment>
    )
}

export default Calendar

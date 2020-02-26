import React, {Fragment, useState} from 'react'
import moment from 'moment'
import MonthHandler from '../MonthHandler'
import DaysHandler from '../DaysHandler'

const Calendar = () => {

    const [displayedMonth, setDisplayedMonth] = useState(moment())

    const changeMonth = (direction: number) => {
        setDisplayedMonth(displayedMonth.add(direction, 'months').clone())
    }

    return (
        <Fragment>
            <MonthHandler changeMonth={changeMonth} currentMonth={displayedMonth.format('MMMM')}/>
            <DaysHandler currentMonth={displayedMonth} />
        </Fragment>
    )
}

export default Calendar

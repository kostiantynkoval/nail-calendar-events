import React, {Fragment, useState} from 'react'
import moment from 'moment'
import MonthHandler from '../MonthHandler'
import DaysHandler from '../DaysHandler'

const Calendar = () => {

    const [displayedDate, setDisplayedDate] = useState(moment())

    const changeMonth = (direction: number) => {
        setDisplayedDate(displayedDate.add(direction, 'months').clone())
    }

    return (
        <Fragment>
            <MonthHandler changeMonth={changeMonth} currentMonth={displayedDate.format('MMMM')}/>
            <DaysHandler currentDate={displayedDate} />
        </Fragment>
    )
}

export default Calendar

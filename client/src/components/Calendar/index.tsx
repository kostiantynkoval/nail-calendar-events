import React, {useState} from 'react'
import moment from 'moment'
import MonthHandler from '../MonthHandler'
import DaysHandler from '../DaysHandler'
import SelectMaster from '../SelectMaster'
import './Calendar.scss'

const Calendar = () => {

    const [displayedMonth, setDisplayedMonth] = useState(moment())

    const changeMonth = (direction: number) => {
        setDisplayedMonth(displayedMonth.add(direction, 'months').clone())
    }

    return (
        <section className="calendar-container">
            <SelectMaster/>
            <MonthHandler changeMonth={changeMonth} currentMonth={displayedMonth.format('MMMM YYYY')}/>
            <DaysHandler currentMonth={displayedMonth} />
        </section>
    )
}

export default Calendar

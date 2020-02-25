import React from 'react'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import './MonthHandler.scss'

interface MonthHandlerProps {
    currentMonth: string
    changeMonth: (direction: number) => void
}

const MonthHandler: React.SFC<MonthHandlerProps> = ({ currentMonth, changeMonth }) => {

    return (
        <p>
            <ArrowLeft onClick={() => changeMonth(-1)}/>
            <span>{currentMonth}</span>
            <ArrowRight onClick={() => changeMonth(1)}/>
        </p>
    )
}

export default MonthHandler

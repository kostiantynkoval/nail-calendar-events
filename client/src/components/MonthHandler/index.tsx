import React, { Fragment } from 'react'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Typography from '@material-ui/core/Typography'
import './MonthHandler.scss'

interface MonthHandlerProps {
    currentMonth: string
    changeMonth: (direction: number) => void
}

const MonthHandler: React.SFC<MonthHandlerProps> = ({ currentMonth, changeMonth }) => {

    return (
        <Fragment>
            <Typography variant="h6" component="h4">Choose your date</Typography>
            <Typography gutterBottom={true} variant="button" component="p">
                <ArrowLeft onClick={() => changeMonth(-1)}/>
                <span>{currentMonth}</span>
                <ArrowRight onClick={() => changeMonth(1)}/>
            </Typography>
        </Fragment>
    )
}

export default MonthHandler

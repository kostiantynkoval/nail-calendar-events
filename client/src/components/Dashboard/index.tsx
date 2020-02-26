import React, {Fragment, createContext, useState} from 'react'
import Calendar from '../Calendar'
import EventsTable from '../EventsTable'
import moment from 'moment'

export const ChosenDate = createContext({
    chosenDate: moment(),
    changeChosenDate: (date: moment.Moment) => {}
})

const Dashboard = () => {

    const [chosenDate, setChosenDate] = useState(moment())

    const changeChosenDate = (date: moment.Moment) => {
        setChosenDate(date)
    }

    return (
        <Fragment>
            <ChosenDate.Provider value={{chosenDate, changeChosenDate}}>
                <Calendar/>
                <EventsTable/>
            </ChosenDate.Provider>
        </Fragment>
    )
}

export default Dashboard

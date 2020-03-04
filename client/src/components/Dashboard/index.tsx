import React, {createContext, useState} from 'react'
import Calendar from '../Calendar'
import EventsTable from '../EventsTable'
import moment from 'moment'
import './Dashboard.scss'

export const ChosenDate = createContext({
    chosenDate: moment(),
    changeChosenDate: (date: moment.Moment) => {}
})

const Dashboard = () => {

    const [chosenDate, setChosenDate] = useState(moment().startOf('date'))

    const changeChosenDate = (date: moment.Moment) => {
        setChosenDate(date.clone().startOf('date'))
    }

    return (
        <div className="dashboard-container">
            <ChosenDate.Provider value={{chosenDate, changeChosenDate}}>
                <Calendar/>
                <div className="dashboard-divider"/>
                <EventsTable/>
            </ChosenDate.Provider>
        </div>
    )
}

export default Dashboard

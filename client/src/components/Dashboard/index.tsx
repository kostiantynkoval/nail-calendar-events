import React, {Fragment} from 'react'
import Calendar from '../Calendar'
import EventsTable from '../EventsTable'

const Dashboard = () => {
    return (
        <Fragment>
            <Calendar/>
            <EventsTable/>
        </Fragment>
    )
}

export default Dashboard

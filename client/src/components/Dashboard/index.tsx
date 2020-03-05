import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react'
import Calendar from '../Calendar'
import EventsTable from '../EventsTable'
import moment from 'moment'
import {Procedure} from '../../interfaces/Procedure'
import './Dashboard.scss'

export const ChosenDate = createContext({
    chosenDate: moment(),
    changeChosenDate: (date: moment.Moment) => {}
})

const initialProcedures: Procedure[] = []
export const Procedures = createContext(initialProcedures)

const Dashboard = () => {

    const [chosenDate, setChosenDate] = useState(moment().startOf('date'))
    const [procedures, setProcedures]: [Procedure[], Dispatch<SetStateAction<Procedure[]>>] = useState<Procedure[]>(initialProcedures)

    useEffect(() => {
        fetch('/procedures')
            .then(res => res.json())
            .then(res => res.procedures)
            .then(procs => setProcedures(procs))
    }, [])

    const changeChosenDate = (date: moment.Moment) => {
        setChosenDate(date.clone().startOf('date'))
    }

    return (
        <div className="dashboard-container">
            <ChosenDate.Provider value={{chosenDate, changeChosenDate}}>
                <Procedures.Provider value={procedures}>
                <Calendar/>
                <div className="dashboard-divider"/>
                <EventsTable/>
                </Procedures.Provider>
            </ChosenDate.Provider>
        </div>
    )
}

export default Dashboard

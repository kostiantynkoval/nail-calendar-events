import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react'
import Calendar from '../Calendar'
import EventsTable from '../EventsTable'
import moment from 'moment'
import { Procedure } from '../../interfaces/Procedure'
import { Technician } from '../../interfaces/Technician'
import './Dashboard.scss'

const initialProcedures: Procedure[] = []
const initialTechnicians: Technician[] = []
const initialSelectedTechnician: Technician = {
    _id: '',
    firstName: 'No chosen technician',
    procedures: []
}

export const ChosenDate = createContext({
    chosenDate: moment(),
    changeChosenDate: (date: moment.Moment) => {}
})
export const Procedures = createContext(initialProcedures)
export const Technicians = createContext({
    technicians: initialTechnicians,
    selectedTechnician: initialSelectedTechnician,
    selectTechnician: (technician: Technician) => {}
})

const Dashboard = () => {

    const [chosenDate, setChosenDate] = useState(moment().startOf('date'))
    const [procedures, setProcedures]: [Procedure[], Dispatch<SetStateAction<Procedure[]>>] = useState<Procedure[]>(initialProcedures)
    const [technicians, setTechnicians]: [Technician[], Dispatch<SetStateAction<Technician[]>>] = useState<Technician[]>([])
    const [selectedTechnician, setSelectedTechnician]: [Technician, Dispatch<SetStateAction<Technician>>] = useState<Technician>(initialSelectedTechnician)

    useEffect(() => {
        fetch('/technicians')
            .then(res => res.json())
            .then(res => res.technicians)
            .then(techs => {
                setTechnicians(techs)
                setSelectedTechnician(techs[0])
            })
        fetch('/procedures')
            .then(res => res.json())
            .then(res => res.procedures)
            .then(procs => setProcedures(procs))
    }, [])

    const changeChosenDate = (date: moment.Moment) => {
        setChosenDate(date.clone().startOf('date'))
    }

    const selectTechnician = (technician: Technician) => {
        setSelectedTechnician(technician)
    }

    return (
        <div className="dashboard-container">
            <ChosenDate.Provider value={{ chosenDate, changeChosenDate }}>
                <Procedures.Provider value={procedures}>
                    <Technicians.Provider value={{technicians, selectedTechnician, selectTechnician}}>
                    <Calendar/>
                    <div className="dashboard-divider"/>
                    <EventsTable/>
                    </Technicians.Provider>
                </Procedures.Provider>
            </ChosenDate.Provider>
        </div>
    )
}

export default Dashboard

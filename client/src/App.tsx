import React, { Fragment, createContext, useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

interface UserData {
    userId: string
    token: string
    initials: string
}

interface UserContext {
    user: UserData | null
    updateUser: (user: UserData | null) => void
}


const defaultUser: UserContext = {
    user: null,
    updateUser: () => ({})
}


export const User = createContext(defaultUser)


function App() {

    const [user, setUser] = useState<UserData | null>(null)

    const updateUser = (updatedUser: UserData | null) => {
        setUser(updatedUser)
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        const initials = localStorage.getItem('initials')
        if(!!userId && !!token && !!initials) {
            updateUser({userId, token, initials})
        }
    }, [])

    return (
        <Fragment>
            <User.Provider value={{user, updateUser}}>
                <Header/>
                <Dashboard/>
            </User.Provider>

        </Fragment>
    )
}

export default App

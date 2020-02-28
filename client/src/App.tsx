import React, { Fragment, createContext, useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

export const User = createContext({
    user: null,
    updateUser: (user: any) => {}
})


function App() {

    const [user, setUser] = useState(null)

    const updateUser = (updatedUser: any) => {
        setUser(updatedUser)
    }

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

import React, { Fragment, createContext, useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import { User as UserData} from './interfaces/User'

interface UserContext {
  user: UserData | null
  updateUser: (token: string | null) => void
}


const defaultUser: UserContext = {
  user: null,
  updateUser: () => ({})
}

const parseJwt = (token: string): UserData => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  
  return JSON.parse(jsonPayload)
}


export const User = createContext(defaultUser)


function App() {
  
  const [user, setUser] = useState<UserData | null>(null)
  
  const updateUser = (token: string | null) => {
    if (!token) {
      setUser(null)
    } else {
      const user = parseJwt(token)
      user.token = token
      setUser(user)
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!!token) {
      updateUser(token)
    }
  }, [])
  
  return (
    <Fragment>
      <User.Provider value={{ user, updateUser }}>
        <Header/>
        <Dashboard/>
      </User.Provider>
    
    </Fragment>
  )
}

export default App

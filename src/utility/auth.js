import React, { useEffect, createContext, useState } from 'react'
import app from './firebase'
import { useHistory } from 'react-router-dom'
export const AuthContext = createContext()

export const Auth = ({ children }) => {
  const [user, setUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setUser(user)
      history.push('/assessments')
    })
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const checkAdminClaim = async user => {
  const token = await user.getIdTokenResult()
  return Object.prototype.hasOwnProperty.call(token.claims, 'admin')
}

import React, { useEffect, createContext, useState } from 'react'
import app from './firebase'

export const AuthContext = createContext()

export const Auth = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    app.auth().onAuthStateChanged(setUser)
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const checkAdminClaim = async user => {
  const token = await user.getIdTokenResult()
  return Object.prototype.hasOwnProperty.call(token.claims, 'admin')
}

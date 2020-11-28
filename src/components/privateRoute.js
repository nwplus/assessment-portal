import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../utility/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={routeProps => (!!user ? <Component {...routeProps} /> : <Redirect to="/login" />)}
    />
  )
}

export default PrivateRoute

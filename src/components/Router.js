import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../pages/Landing'
import Assessments from '../pages/Assessments'
import { Auth } from '../utility/auth'
import PrivateRoute from './privateRoute'
import Login from '../pages/login'

//  <PrivateRoute exact path="/" component={Landing} />
// <PrivateRoute exact path="/assessments" component={Assessments} />

export default function Router() {
  return (
    <BrowserRouter>
      <Auth>
        <Switch>
          <PrivateRoute exact path="/assessments" component={Assessments} />
          <Route exact path="/login" render={() => <Login />} />
        </Switch>
      </Auth>
    </BrowserRouter>
  )
}

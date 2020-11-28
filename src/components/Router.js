import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../pages/landing'
import Assessments from '../pages/assessments'
import { Auth } from '../utility/auth'
import PrivateRoute from './privateRoute'
import Login from '../pages/login'

export default function Router() {
  return (
    <Auth>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Landing} />
          <PrivateRoute exact path="/assessments" component={Assessments} />
          <Route exact path="/login" render={() => <Login />} />
        </Switch>
      </BrowserRouter>
    </Auth>
  )
}

import React from 'react'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'
import Landing from '../pages/landing'
import Assessments from '../pages/assessments'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={() => <Landing />}/>
                <Route path='/assessments' render={() => <Assessments />}/>
            </Switch>
        </BrowserRouter>
    )
}
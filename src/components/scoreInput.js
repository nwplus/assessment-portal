// these are the blue buttons for the applicantScore sidebar

import React from 'react'
import Number from './numberIcon'

export default function ScoreInput({label, score}) {

    return(
        <div>
            <label> 
                {label} 
            </label>
            <div style={{display: "flex"}}>
                <Number number="1"/>
                <Number number="2"/>
                <Number number="3"/>
                <Number number="4"/>
                <Number number="5"/>
            </div>
        </div>
    )
}
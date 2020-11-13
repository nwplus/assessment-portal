import React from 'react'


export default function ResponseInput({label, response}) {

    return(
        <div>
            <h5> {label} </h5>
            <textarea disabled={true} style={{"resize": "none"}} defaultValue={response} /> 
        </div>
    )
}
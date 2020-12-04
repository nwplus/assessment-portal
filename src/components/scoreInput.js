// these are the blue buttons for the applicantScore sidebar

import React, {useState} from 'react'
import Number from './numberIcon'

export default function ScoreInput({label, score, handleClick}) {

    const [currScore, setScore] = useState(score)

    const clickNewScore = newScore => {
        setScore(newScore)
    }
 

    const arr = [...Array(6).keys()]; 

    return(
        <div>
            <label> 
                {label} 
            </label>
            <div style={{display: "flex"}}>
                {arr.map(num=>{
                    return <Number 
                            label={label} 
                            number={num} 
                            active={currScore===num} 
                            clickNewScore={clickNewScore} 
                            key={num} 
                            handleClick={handleClick} />
                })}
            </div>
        </div>
    )
}
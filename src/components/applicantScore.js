// this is the second side bar for the scoringPage

import React from 'react'
import styled from 'styled-components'
import ScoreInput from './scoreInput'

const Main = styled.div`
    padding: 20px;
    border: 1px solid gray;
`;

function ScoreSummary(){
    return(
        <div style={{display: "flex", flexDirection: "column" }}>
           <label> Total Score: </label>

           <label> GitHub / Personal Website </label>

           <label> Resume /  LinkedIn </label>

           <label> Written Response 1 </label>

           <label> Written Response 2 </label>
           
        </div>
    )
}


export default function ApplicantScore() {

    return(
        <Main>
            <h3>Scoring</h3>
            <hr />
            <ScoreInput label="Github/Personal Website" />
            <hr />
            <ScoreInput label="Resume/LinkedIn" />
            <hr />
            <ScoreInput label="What is a project you're interested in building?" />
            <hr />
            <ScoreInput label="Tell us a recent project you've worked on that you're proud of!" />

            <ScoreSummary/>



        </Main>
    )
}
// this is the second side bar for the scoringPage

import React from 'react'
import styled from 'styled-components'
import ScoreInput from './scoreInput'

const Main = styled.div`
    padding: 0px 20px;
    border: 1px solid gray;
    text-align: left;
`;

export default function ApplicantScore() {

    return(
        <Main>
            <h4>Scoring</h4>
         
            <ScoreInput label="Github/Personal Website" />
            <ScoreInput label="Resume/LinkedIn" />
            <ScoreInput label="What is a project you're interested in building?" />
            <ScoreInput label="Tell us a recent project you've worked on that you're proud of!" />

            <div style={{display: "flex", flexDirection: "column" }}>
                <label> Total Score: </label>
                <label> GitHub / Personal Website </label>
                <label> Resume /  LinkedIn </label>
                <label> Written Response 1 </label>
                <label> Written Response 2 </label>
            </div>

        </Main>
    )
}
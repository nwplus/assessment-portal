// this is the second side bar for the scoringPage
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ScoreInput from './scoreInput'


const Main = styled.div`
    padding: 0px 20px;
    border: 1px solid gray;
    text-align: left;
`;

export default function ApplicantScore(props) {

    const [totalScore, setTotalScore] = useState()


    return(
        <Main>
            <h4>Scoring</h4>
         
            <ScoreInput label="Github/Personal Website" score={props.hacker.score.WebsiteScore}/>
            <ScoreInput label="Resume/LinkedIn" score={props.hacker.score.ResumeScore}/>
            <ScoreInput label="What is a project you're interested in building?" score={props.hacker.score.MainInterestScore}/>
            <ScoreInput label="Tell us a recent project you've worked on that you're proud of!" score={props.hacker.score.PassionScore}/>

            <div style={{display: "flex", flexDirection: "column" }}>
                <label> Total Score: {totalScore}</label>
                <label> GitHub / Personal Website </label>
                <label> Resume /  LinkedIn </label>
                <label> Written Response 1 </label>
                <label> Written Response 2 </label>
            </div>

        </Main>
    )
}
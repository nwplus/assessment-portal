// this is the second side bar for the scoringPage
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ScoreInput from './scoreInput'
import { updateApplicantScore } from '../utility/firebase'


const Main = styled.div`
    padding: 0px 20px;
    border: 1px solid gray;
    text-align: left;
`;

export default function ApplicantScore(props) {

    const [userHasScore, setUserHasScore] = useState(false)
    const [score, setScore] = useState({
        WebsiteScore: null,
        ResumeScore: null,
        MainInterestScore: null,
        PassionScore: null,
    })

    useEffect(() => {
        setUserHasScore(false)
        props.hacker.hasOwnProperty('score') ? setUserHasScore(true) : setUserHasScore(false)
    }, [props])

    const handleClick = (value, label) =>{
        switch(label){
            case "Github/Personal Website":
                updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.WebsiteScore": value})
                break
            case "Resume/LinkedIn":
                updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.ResumeScore": value})
                break
            case "What is a project you're interested in building?":
                updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.MainInterestScore": value})
                break
            case "Tell us a recent project you've worked on that you're proud of!":
                updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.PassionScore": value})
                break
            default:
                alert('Error!')
                break
        }
        //updateApplicantData('LHD2021', props.hacker.firebaseID, )
        //console.log(value, label)
    }
    
    if (userHasScore){
        return(
            <Main>
                <h4>Scoring</h4>
            
                <ScoreInput label="Github/Personal Website" score={props.hacker.score.WebsiteScore} handleClick={handleClick}/>
                <ScoreInput label="Resume/LinkedIn" score={props.hacker.score.ResumeScore} handleClick={handleClick}/>
                <ScoreInput label="What is a project you're interested in building?" score={props.hacker.score.MainInterestScore} handleClick={handleClick}/>
                <ScoreInput label="Tell us a recent project you've worked on that you're proud of!" score={props.hacker.score.PassionScore} handleClick={handleClick}/>

                <div style={{display: "flex", flexDirection: "column" }}>
                    <label> Total Score: </label>
                    <label> GitHub / Personal Website </label>
                    <label> Resume /  LinkedIn </label>
                    <label> Written Response 1 </label>
                    <label> Written Response 2 </label>
                </div>
            </Main>)
    } else {
        return(
            <Main>
                <h4>Scoring</h4>
                <ScoreInput label="Github/Personal Website" score={score.WebsiteScore} handleClick={handleClick}/>
                <ScoreInput label="Resume/LinkedIn" score={score.ResumeScore} handleClick={handleClick}/>
                <ScoreInput label="What is a project you're interested in building?" score={score.MainInterestScore} handleClick={handleClick}/>
                <ScoreInput label="Tell us a recent project you've worked on that you're proud of!" score={score.PassionScore} handleClick={handleClick}/>

            <div style={{display: "flex", flexDirection: "column"}}>
                <label> Total Score: </label>
                <label> GitHub / Personal Website </label>
                <label> Resume /  LinkedIn </label>
                <label> Written Response 1 </label>
                <label> Written Response 2 </label>
            </div>
            </Main>)
    }

    
}
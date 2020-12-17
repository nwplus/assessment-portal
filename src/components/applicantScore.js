// this is the second side bar for the scoringPage
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ScoreInput from './scoreInput'
import { updateApplicantScore } from '../utility/firebase'
import { COLOR } from '../constants'


const Main = styled.div`
    padding: 0px 20px;
    text-align: left;
`;

const Summary = styled.div`
    width: 34.2%;
    text-align: left;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    padding: 20px 20px;
    background: #F2F2F2;
`

export default function ApplicantScore(props) {

    const [hasScore, setHasScore] = useState(false)

    const [score, setScore] = useState({
        WebsiteScore: null,
        ResumeScore: null,
        MainInterestScore: null,
        PassionScore: null,
    })

    useEffect(() => {
        if (props.hacker.hasOwnProperty('score')) {
            setScore(props.hacker.score)
            setHasScore(true)

        } else {
            setScore({
                WebsiteScore: null,
                ResumeScore: null,
                MainInterestScore: null,
                PassionScore: null,
            })
            setHasScore(false)
        }
    }, [props])


    const handleClick = async (value, label) =>{
        switch(label){
            case "Github/Personal Website":
                props.passingUpScore(props.hacker.firebaseID, {...score, WebsiteScore:value})
                setScore({...score, WebsiteScore: value})
                await updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.WebsiteScore": value})
                break
            case "Resume/LinkedIn":
                props.passingUpScore(props.hacker.firebaseID, {...score, ResumeScore:value})
                setScore({...score, ResumeScore: value})
                await updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.ResumeScore": value})
                break
            case "What is a project you're interested in building?":
                props.passingUpScore(props.hacker.firebaseID, {...score, MainInterestScore:value})
                setScore({...score, MainInterestScore: value})
                await updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.MainInterestScore": value})
                break
            case "Tell us a recent project you've worked on that you're proud of!":
                props.passingUpScore(props.hacker.firebaseID, {...score, PassionScore:value})
                setScore({...score, PassionScore: value})
                await updateApplicantScore('LHD2021', props.hacker.firebaseID, {"score.PassionScore": value})
                break
            default:
                alert('Error!')
                break
        }
    }

    return(
        <div>
            <Main>
                <h4>Scoring</h4>
                <ScoreInput label="Github/Personal Website" score={score.WebsiteScore} handleClick={handleClick}/>
                <ScoreInput label="Resume/LinkedIn" score={score.ResumeScore} handleClick={handleClick}/>
                <ScoreInput label="What is a project you're interested in building?" score={score.MainInterestScore} handleClick={handleClick}/>
                <ScoreInput label="Tell us a recent project you've worked on that you're proud of!" score={score.PassionScore} handleClick={handleClick}/>
            </Main>
            {hasScore && 
            <Summary>
                <label> Total Score: </label>
                <label> GitHub / Personal Website </label>
                <label> Resume /  LinkedIn </label>
                <label> Written Response 1 </label>
                <label> Written Response 2 </label>
            </Summary>}
        </div>
    )
    
    
}

// this is the second side bar for the scoringPage
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ScoreInput from './scoreInput'
import { updateApplicantScore } from '../utility/firebase'
import { COLOR } from '../constants'

const Main = styled.div`
  padding: 0px 20px;
  text-align: left;
`

const Summary = styled.div`
  text-align: left;
  margin-top: 20px;
  padding: 20px 20px;
  background: #f2f2f2;
`

export default function ApplicantScore(props) {
  const { hacker } = props
  const [hasScore, setHasScore] = useState(false)

  const [score, setScore] = useState({
    WebsiteScore: null,
    ResumeScore: null,
    ResponseScore: null,
  })

  useEffect(() => {
    if (hacker.hasOwnProperty('score')) {
      setScore(hacker.score)
      setHasScore(true)
    } else {
      setScore({
        WebsiteScore: null,
        ResumeScore: null,
        ResponseScore: null,
      })
      setHasScore(false)
    }
  }, [props])

  const handleClick = async (value, label) => {
    switch (label) {
      case 'Github/Personal Website':
        await updateApplicantScore('nwHacks2021', props.hacker._id, {
          ...score,
          WebsiteScore: value,
        })
        break
      case 'Resume/LinkedIn':
        await updateApplicantScore('nwHacks2021', props.hacker._id, {
          ...score,
          ResumeScore: value,
        })
        break
      case 'Written Response Score':
        await updateApplicantScore('nwHacks2021', props.hacker._id, {
          ...score,
          ResponseScore: value,
        })
        break
      default:
        alert('Error!')
        break
    }
  }

  return (
    <div>
      <Main>
        <h4>Scoring</h4>
        <ScoreInput
          label="Github/Personal Website"
          score={score.WebsiteScore}
          handleClick={handleClick}
        />
        <ScoreInput label="Resume/LinkedIn" score={score.ResumeScore} handleClick={handleClick} />
        <ScoreInput
          label="Written Response Score"
          score={score.ResponseScore}
          handleClick={handleClick}
        />
      </Main>
      {hasScore && (
        <Summary>
          <label> Total Score: {score.totalScore}/15 </label>
        </Summary>
      )}
    </div>
  )
}

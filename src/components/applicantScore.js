// this is the second side bar for the scoringPage
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import ScoreInput from './scoreInput'
import { updateApplicantScore } from '../utility/firebase'
import { AuthContext } from '../utility/auth'
import moment from 'moment'
import { MAX_SCORE, MAX_SCORES } from '../constants'

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

  const { user } = useContext(AuthContext)

  const [score, setScore] = useState({
    ResumeScore: null,
    ResponseScore: null,
  })

  useEffect(() => {
    if (hacker?.score?.scores) {
      setScore(hacker.score.scores)
      setHasScore(true)
    } else {
      setScore({
        ResumeScore: null,
        ResponseScore: null,
      })
      setHasScore(false)
    }
  }, [hacker])

  const handleClick = async (value, label) => {
    switch (label) {
      case 'Resume/LinkedIn':
        await updateApplicantScore(
          'nwHacks2021',
          props.hacker._id,
          {
            ...score,
            ResumeScore: value,
          },
          user.email
        )
        break
      case 'Written Response Score':
        await updateApplicantScore(
          'nwHacks2021',
          props.hacker._id,
          {
            ...score,
            ResponseScore: value,
          },
          user.email
        )
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
          label="Resume/LinkedIn"
          score={score.ResumeScore}
          handleClick={handleClick}
          maxScore={MAX_SCORES.RESUME}
        />
        <ScoreInput
          maxScore={MAX_SCORES.ESSAY}
          label="Written Response Score"
          score={score.ResponseScore}
          handleClick={handleClick}
        />
      </Main>
      {hasScore && (
        <Summary>
          <label>
            {' '}
            Total Score: {hacker.score?.totalScore}/{MAX_SCORE}{' '}
          </label>
          <br />
          <label> Last updated by: {hacker.score?.lastUpdatedBy}</label>
          <br />
          <label>
            {' '}
            at: {moment(hacker.score?.lastUpdated.toDate()).format('dddd, MMMM Do, YYYY h:mm:ss A')}
          </label>
          <br />
        </Summary>
      )}
    </div>
  )
}

import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { APPLICATION_STATUS, COLOR } from '../constants'
import { getApplicantsToAccept, updateApplicantStatus } from '../utility/firebase'
import Button from './Button'
const GreyDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
`

const ModalDiv = styled.div`
  width: 400px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 25%;
  background-color: white;
  transform: translate(-50%, -25%);
  opacity: 100%;
`
const ScoreInput = styled.input`
  font-size: 16px;
  border: 1px solid ${COLOR.BLACK};
  border-radius: 4px;
  box-sizing: border-box;
  margin: 8px 20px 8px 20px;
  text-align: left;
  padding: 0px 10px;
  :focus {
    color: ${COLOR.BLACK};
  }
`
const TotalApplicantsP = styled.p`
  font-weight: bold;
`

const FlexDiv = styled.div`
  display: flex;
`

const acceptApplicant = async applicant => {
  return updateApplicantStatus(applicant._id, APPLICATION_STATUS.accepted.text)
}

export default function AcceptingModal({ setShowing }) {
  const backgroundRef = useRef()
  const [totalApplicants, setTotalApplicants] = useState(0)
  const [score, setScore] = useState(undefined)
  const [applicantsToAccept, setApplicants] = useState([])

  const getApplicants = async () => {
    const apps = await getApplicantsToAccept(score)
    setTotalApplicants(apps.length)
    setApplicants(apps)
  }

  const acceptApplicants = async () => {
    if (!applicantsToAccept) return
    await Promise.all(applicantsToAccept.map(app => acceptApplicant(app)))
    setShowing(false)
  }

  return (
    <GreyDiv
      ref={backgroundRef}
      onClick={e => {
        if (backgroundRef.current && backgroundRef.current === e.target) {
          setShowing(false)
        }
      }}
    >
      <ModalDiv>
        <h3>Accept applicants</h3>
        {/* <ScoreInput /> */}
        <FlexDiv>
          <ScoreInput
            onChange={e => {
              if (!isNaN(e.target.value)) setScore(e.target.value)
            }}
            value={score ?? ''}
            placeholder="minimum score"
          />
          <TotalApplicantsP>Total applicants: {totalApplicants}</TotalApplicantsP>
        </FlexDiv>
        <FlexDiv style={{ justifyContent: 'center' }}>
          <Button
            onClick={() => {
              getApplicants()
            }}
            disabled={!(score > 0)}
            width="flex"
            bColor={COLOR.BLUE_TEXT}
          >
            See count
          </Button>
          <Button
            onClick={() => {
              acceptApplicants()
            }}
            disabled={!(totalApplicants > 0)}
            width="flex"
            bColor={'green'}
          >
            Accept Applicants
          </Button>
        </FlexDiv>
      </ModalDiv>
    </GreyDiv>
  )
}

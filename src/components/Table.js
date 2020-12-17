import React from 'react'
import styled from 'styled-components'
import { COLOR, MAX_SCORE } from '../constants'
import ApplicantResponse from './applicantResponse'
import ApplicantScore from './applicantScore'

const styles = {
  nameEmailContainer: {
    flex: 3,
    textAlign: 'left',
  },
  indexScoreContainer: {
    flex: 1,
    textAlign: 'right',
  },
  unselectedHackerContainer: {},
  selectedHackerContainer: {},
}

const UnselectedName = styled.p`
  font-size: 16px;
  color: ${COLOR.DARK_GRAY};
  margin: 0px;
  font-weight: bold;
`

const SelectedName = styled.p`
  font-size: 16px;
  color: ${COLOR.BLUE_TEXT};
  margin: 0px;
  font-weight: bold;
`

const LightGrayText = styled.p`
  font-size: 16px;
  color: ${COLOR.LIGHT_GRAY};
  margin: 0px;
`

const BlueText = styled.p`
  font-size: 16px;
  color: ${COLOR.BLUE_TEXT};
  margin: 0px;
`

const UnselectedRowDiv = styled.div`
  display: flex;
  padding: 10px 16px 6px 16px;
  cursor: pointer;
`
const SelectedRowDiv = styled.div`
  display: flex;
  padding: 10px 16px 6px 16px;
  cursor: pointer;
  background: ${COLOR.LIGHT_BLUE};
`

const Scored = styled.p`
  color: ${COLOR.LIGHT_GRAY};
  font-size: 16px;
  margin: 0px;
`

const Unscored = styled.p`
  color: ${COLOR.UNSCORED_GRAY};
  font-size: 16px;
  margin: 0px;
`

export default function Table(props) {
  const selectedHacker = props.selectedHacker

  const selectHacker = hacker => {
    props.setSelectedHacker(hacker)
  }

  function Row(rowProp) {
    return selectedHacker.basicInfo === rowProp.hacker.basicInfo ? (
      <SelectedRowDiv onClick={() => selectHacker(rowProp.hacker)}>
        <div style={styles.nameEmailContainer}>
          <SelectedName>
            {rowProp.hacker.basicInfo.firstName} {rowProp.hacker.basicInfo.lastName}
          </SelectedName>
          <BlueText>{rowProp.hacker.basicInfo.email}</BlueText>
        </div>
        <div style={styles.indexScoreContainer}>
          <LightGrayText>{rowProp.index}</LightGrayText>
          {rowProp.hacker.score ? (
            <Scored>
              {rowProp.hacker.score.totalScore ?? '?'}/{MAX_SCORE}
            </Scored>
          ) : (
            <Unscored>/{MAX_SCORE}</Unscored>
          )}
        </div>
      </SelectedRowDiv>
    ) : (
      <UnselectedRowDiv onClick={() => selectHacker(rowProp.hacker)}>
        <div style={styles.nameEmailContainer}>
          <UnselectedName>
            {rowProp.hacker.basicInfo.firstName} {rowProp.hacker.basicInfo.lastName}
          </UnselectedName>
          <LightGrayText>{rowProp.hacker.basicInfo.email}</LightGrayText>
        </div>
        <div style={styles.indexScoreContainer}>
          <LightGrayText>{rowProp.index}</LightGrayText>
          {rowProp.hacker.score ? (
            <Scored>
              {rowProp.hacker.score.totalScore ?? '?'}/{MAX_SCORE}
            </Scored>
          ) : (
            <Unscored>/{MAX_SCORE}</Unscored>
          )}
        </div>
      </UnselectedRowDiv>
    )
  }

  const AllHackersRow = () => {
    return (
      <UnselectedRowDiv>
        <div style={styles.nameEmailContainer}>
          <UnselectedName>
            {props.displayedHackers.length}{' '}
            {props.displayedHackers.length === 1 ? 'Hacker' : 'Hackers'}
          </UnselectedName>
        </div>
      </UnselectedRowDiv>
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, overflowY: 'auto', height: '88vh' }}>
        <AllHackersRow />
        {props.displayedHackers.map((hacker, index) => {
          return <Row key={hacker.basicInfo.email} hacker={hacker} index={index} />
        })}
      </div>
      {Object.keys(selectedHacker).length !== 0 ? (
        <React.Fragment>
          <ApplicantScore hacker={selectedHacker} style={{ flex: 1 }} />
          <ApplicantResponse
            setSelectedHacker={props.setSelectedHacker}
            hacker={selectedHacker}
            style={{ flex: 1 }}
          />
        </React.Fragment>
      ) : (
        <div></div>
      )}
    </div>
  )
}

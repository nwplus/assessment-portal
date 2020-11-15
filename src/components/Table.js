import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

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
    return selectedHacker.email === rowProp.hacker.email ? (
      <SelectedRowDiv onClick={() => selectHacker(rowProp.hacker)}>
        <div style={styles.nameEmailContainer}>
          <SelectedName>
            {rowProp.hacker.fname} {rowProp.hacker.lname}
          </SelectedName>
          <BlueText>{rowProp.hacker.email}</BlueText>
        </div>
        <div style={styles.indexScoreContainer}>
          <LightGrayText>{rowProp.index}</LightGrayText>
          {rowProp.hacker.score ? (
            <Scored>{rowProp.hacker.score}/10</Scored>
          ) : (
            <Unscored>/10</Unscored>
          )}
        </div>
      </SelectedRowDiv>
    ) : (
      <UnselectedRowDiv onClick={() => selectHacker(rowProp.hacker)}>
        <div style={styles.nameEmailContainer}>
          <UnselectedName>
            {rowProp.hacker.fname} {rowProp.hacker.lname}
          </UnselectedName>
          <LightGrayText>{rowProp.hacker.email}</LightGrayText>
        </div>
        <div style={styles.indexScoreContainer}>
          <LightGrayText>{rowProp.index}</LightGrayText>
          {rowProp.hacker.score ? (
            <Scored>{rowProp.hacker.score}/10</Scored>
          ) : (
            <Unscored>/10</Unscored>
          )}
        </div>
      </UnselectedRowDiv>
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {props.displayedHackers.map((hacker, index) => {
          return <Row key={hacker.email} hacker={hacker} index={index} />
        })}
      </div>
      {Object.keys(selectedHacker).length !== 0 ? (
        <React.Fragment>
          <div style={{ flex: 1 }}>Scoring</div>
          <div style={{ flex: 1 }}>Overview/Resume/Comments</div>
        </React.Fragment>
      ) : (
        <div></div>
      )}
    </div>
  )
}

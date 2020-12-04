// this is the third sidebar for the scoring page

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ResponseInput from './responseInput'
import { COLOR, TABS } from '../constants'
import { render } from '@testing-library/react'
import { Document, Page, pdfjs } from 'react-pdf'

const Main = styled.div`
  padding: 20px;
  max-width: 30%;
  border: 1px solid gray;
  margin-right: 30px;
  text-align: left;
`

const Tab = styled.div`
  margin-right: 20px;
  :hover {
    color: ${COLOR.BLUE_TEXT};
    cursor: pointer;
  }
`

export default function ApplicantResponse(props) {
  useEffect(() => {
    // DO NOT DELETE
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
    //console.log('applicant', props.hacker)
    if( props.hacker.hasOwnProperty('skills') 
    && props.hacker.skills.hasOwnProperty('longAnswers') 
    && Object.keys(props.hacker.skills.longAnswers).length > 1) {
      setUserHasData(true) 
    } else {
      setUserHasData(false)
    }
  }, [props])

  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW)
  const [userHasData, setUserHasData] = useState(false)


  return (
    <Main>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Tab onClick={() => setActiveTab(TABS.OVERVIEW)}> Overview </Tab>
        <Tab onClick={() => setActiveTab(TABS.RESUME)}> Resume </Tab>
        <Tab onClick={() => setActiveTab(TABS.COMMENTS)}> Comments </Tab>
      </div>
      {activeTab === TABS.OVERVIEW ? (
        <OverviewTab> </OverviewTab>
      ) : activeTab === TABS.RESUME ? (
        <ResumeTab pdf={props.hacker.skills.resume}></ResumeTab>
      ) : (
        <CommentTab comments={props.hacker.comments}></CommentTab>
      )}
    </Main>
  )

  function OverviewTab() {
    if (userHasData) {
      return (
        <>
          <ResponseInput label="Is this your first hackathon?" response={props.hacker.skills.longAnswers[0]} />
          <ResponseInput label="GitHub/GitLab/BitBucket" response="https://github.com/yungalyx" />
          <ResponseInput label="Personal Site" response="yes" />
          <ResponseInput
            label="What are you interested in building at nwHacks? Tell us about an idea you have, and why it gets you excited."
            response={props.hacker.skills.longAnswers.interest}
          />
          <ResponseInput
            label="What can you teach others at nwHacks? (It can be a specific skill, technology, or an area of domain knowledge)."
            response={props.hacker.skills.longAnswers.teach}
          />
          <ResponseInput
            label="Tell us about a recent project you've worked on that you're proud of! It doesn't have to be a technical project."
            response={props.hacker.skills.longAnswers.passion}
          />
        </>
      )
    } else {
      return (<div>
        Selected user has missing data in their application.
      </div>)
    }
  }

  function ResumeTab(props) {
    return (
      <Document file={{ url: 'gs://nwplus-ubc-dev.appspot.com/applicantResumes/testResume.pdf' }}>
        <Page pageNumber={1} />
      </Document>
    )
  }

  function CommentTab(props) {
    if (props.comments) {
      return (
        <div>
          {Object.entries(props.comments).map(([key, value]) => (
            <div> {key} </div>
          ))}
        </div>
      )
    } else {
      return <div> got nothing fam </div>
    }
  }

  // {Object.entriesprops.map((id, data) => {
  //     return (
  //     <div key={id}> {data.comment} by {data.by} </div>
  //         )
  //     })
  // }
}

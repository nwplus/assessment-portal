// this is the third sidebar for the scoring page

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ResponseInput from './responseInput'
import { COLOR, TABS } from '../constants'
import { getResumeFile } from '../utility/firebase'

const Main = styled.div`
  padding: 20px;
  max-width: 33%;
  border: 1px solid gray;
  text-align: left;
  overflow-y: scroll;
  height: 85vh;
`

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  border-bottom: 1px gray solid;
  width: 100%;
`

const Tab = styled.div`
  margin-right: 20px;
  :hover {
    color: ${COLOR.BLUE_TEXT};
    cursor: pointer;
  }
`

export default function ApplicantResponse(props) {
  const { hacker } = props
  useEffect(() => {
    if (
      props.hacker.hasOwnProperty('skills') &&
      props.hacker.skills.hasOwnProperty('longAnswers') &&
      Object.keys(props.hacker.skills.longAnswers).length > 1
    ) {
      setUserHasData(true)
    } else {
      setUserHasData(false)
    }
  }, [props])

  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW)
  const [userHasData, setUserHasData] = useState(false)

  return (
    <Main>
      <TabContainer>
        <Tab onClick={() => setActiveTab(TABS.OVERVIEW)}> Basic Info </Tab>
        <Tab onClick={() => setActiveTab(TABS.RESUME)}> Skills </Tab>
        <Tab onClick={() => setActiveTab(TABS.COMMENTS)}> Comments(WIP) </Tab>
      </TabContainer>
      {activeTab === TABS.OVERVIEW ? (
        <OverviewTab> </OverviewTab>
      ) : activeTab === TABS.RESUME ? (
        <ResumeTab />
      ) : (
        <CommentTab comments={props.hacker.comments}></CommentTab>
      )}
    </Main>
  )

  function OverviewTab() {
    if (userHasData) {
      return (
        <div style={{ paddingTop: '10px' }}>
          <ResponseInput
            label="Full name"
            response={`${hacker.basicInfo?.firstName} ${hacker.basicInfo.lastName}`}
          />
          <ResponseInput label="Email" response={hacker.basicInfo?.email} />
          <ResponseInput label="Role" response={hacker.basicInfo?.contributionRole} />
          <ResponseInput
            label="19 or over?"
            response={hacker.basicInfo?.isOfLegalAge ? 'yes' : 'no'}
          />
          <ResponseInput
            label="School/Major"
            response={`Studying ${hacker.basicInfo?.major} at ${hacker.basicInfo?.school}`}
          />
          <ResponseInput label="Visiting From" response={hacker.basicInfo?.location} />
          <ResponseInput
            label="Hackathons Attended"
            response={hacker.basicInfo.hackathonsAttended}
          />
        </div>
      )
    } else {
      return <div>Selected user has missing data in their application.</div>
    }
  }

  function ResumeTab() {
    return (
      <div style={{ paddingTop: '10px' }}>
        <ResponseInput label="Resume" response={ResumeLink()} />
        <ResponseInput label="GitHub/GitLab/BitBucket" response={hacker.skills?.github} />
        <ResponseInput label="LinkedIn" response={hacker.skills?.linkedin} />
        <ResponseInput label="Portfolio" response={hacker.skills?.portfolio} />
        <ResponseInput
          label={
            <div>
              Long answers which are either
              <br />
              1. Describe how you became interested in the world of technology and where you hope to
              go from here on out!
              <br />
              2. How would you like to challenge yourself during this hackathon?
            </div>
          }
          response={props.hacker.skills.longAnswers}
        />
      </div>
    )
  }

  function ResumeLink() {
    const [file, setFile] = useState(null)
    const [noResume, setNoResume] = useState(false)
    useEffect(() => {
      getResumeFile(hacker._id)
        .then(async url => {
          const data = await fetch(url)
          const file = await data.blob()
          const fileURL = URL.createObjectURL(file)
          setFile(fileURL)
        })
        .catch(() => setNoResume(true))
    }, [hacker])

    return !file && noResume === false ? (
      <>Loading</>
    ) : noResume ? (
      <div>No resume</div>
    ) : (
      <a href={file} target="_blank">
        View Resume
      </a>
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
      return <div> WIP </div>
    }
  }

  // {Object.entriesprops.map((id, data) => {
  //     return (
  //     <div key={id}> {data.comment} by {data.by} </div>
  //         )
  //     })
  // }
}

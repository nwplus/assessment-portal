import React from 'react'
import { useState, useEffect } from 'react'
import testPDf from '../assets/testResume.pdf'

import Table from '../components/Table'

export default function Assessments() {
  const [hackers, setHackers] = useState([
    {
      fname: 'Derek',
      lname: 'Chen',
      email: 'derek@nwplus.io',
      score: {
        WebsiteScore: 0,
        ResumeScore: 3,
        InterestScore: 2,
        PassionScore: 5,
      },
      resume: testPDf
    },
    {
      fname: 'Alex',
      lname: 'Lin',
      email: 'alex@nwplus.io',
      score: {
        WebsiteScore: 0,
        ResumeScore: 3,
        InterestScore: 2,
        PassionScore: 5,
      },
      resume: testPDf
    },
    {
      fname: 'test',
      lname: 'user',
      email: 'test@nwplus.io',
      score: {
        WebsiteScore: 7,
        ResumeScore: 3,
        InterestScore: 2,
        PassionScore: 5,
      },
      resume: null
    },

  ])
  const [selectedHacker, setSelectedHacker] = useState({})

  useEffect(() => {
    // pull data
  }, [])

  return (
    <div>
      <Table
        hackers={hackers}
        selectedHacker={selectedHacker}
        setSelectedHacker={setSelectedHacker}
      />
    </div>
  )
}

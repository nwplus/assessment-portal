import React from 'react'
import { useState, useEffect } from 'react'
import testPDf from '../assets/testResume.pdf'
import Table from '../components/Table'
import ToolBar from '../components/toolbar'
import { getAllApplicants } from '../utility/firebase'

export default function Assessments() {
  const [hackers, setHackers] = useState([
    {
      fname: 'Derek',
      lname: 'Chen',
      email: 'derek@nwplus.io',
      resume: testPDf,
      timestamp: 123,
    },
    {
      fname: 'Another',
      lname: 'chen',
      email: 'anotherChen@nwplus.io',
      timestamp: 202222222222,
    },
    {
      fname: 'Alex',
      lname: 'Lin',
      email: 'alex@nwplus.io',
      score: 7,
      timestamp: 1,
    },
    {
      fname: 'test',
      lname: 'user',
      email: 'test@nwplus.io',
      score: 0,
      timestamp: 234234,
    },
  ])

  // displayedHackers is what is displayed to users with search/filter/sort
  const [displayedHackers, setDisplayedHackers] = useState([
    {
      fname: 'Derek',
      lname: 'Chen',
      email: 'derek@nwplus.io',
      score: 7,
    },
    {
      fname: 'Another',
      lname: 'chen',
      email: 'anotherChen@nwplus.io',
    },
    {
      fname: 'Alex',
      lname: 'Lin',
      email: 'alex@nwplus.io',
      score1: {
        WebsiteScore: 0,
        ResumeScore: 3,
        InterestScore: 2,
        PassionScore: 5,
      },
      resume: testPDf,
      comments: {
        hola: { comment: 'this guy sus', by: 'alex' },
        sura: { comment: 'vote red', by: 'erica' },
      },
    },
    {
      fname: 'test',
      lname: 'user',
      email: 'test@nwplus.io',
      score1: {
        WebsiteScore: 7,
        ResumeScore: 3,
        InterestScore: 2,
        PassionScore: 5,
      },
      resume: null,
    },
  ])
  const [selectedHacker, setSelectedHacker] = useState({})

  const [loading, setLoading] = useState(true)

  const loadFirebase = async () => {
    const data = await getAllApplicants('LHD2021')
    // trying to move the userID (key) into values side
      
    for (const key in data) {
      data[key].firebaseID = key
    }
    const arr = Object.values(data)
    setHackers(arr)
    setDisplayedHackers(arr)
    console.log(arr)
  
  }

  useEffect(() => {
    setLoading(true)
    const initializeFirebase = async () => {
      await loadFirebase()
      setLoading(false)
    }
    initializeFirebase()
  }, [])

  return (
    <div>
      {!loading && (
        <>
          <ToolBar
            hackers={hackers}
            setDisplayedHackers={setDisplayedHackers}
            displayedHackers={displayedHackers}
          />
          <Table
            displayedHackers={displayedHackers}
            selectedHacker={selectedHacker}
            setSelectedHacker={setSelectedHacker}
          />
        </>
      )}
    </div>
  )
}

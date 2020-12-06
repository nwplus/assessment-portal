import React from 'react'
import { useState, useEffect } from 'react'
import testPDf from '../assets/testResume.pdf'
import Table from '../components/Table'
import ToolBar from '../components/toolbar'
import app, { getAllApplicants } from '../utility/firebase'

export default function Assessments() {
  const [hackers, setHackers] = useState([])

  // displayedHackers is what is displayed to users with search/filter/sort
  const [displayedHackers, setDisplayedHackers] = useState([])
  
  const [selectedHacker, setSelectedHacker] = useState({})

  const [loading, setLoading] = useState(true)

  // passing changes up from scoring component
  const handleChangesfromScoring = (applicantID, newscore) => {
    const i = hackers.findIndex(person => person.firebaseID === applicantID);
    let copyHackers = [...hackers]
    let hackerWithNewScore = {...copyHackers[i]}
    hackerWithNewScore.score = newscore
    copyHackers[i] = hackerWithNewScore
    setHackers(copyHackers)
    setDisplayedHackers(copyHackers)
    setSelectedHacker(hackerWithNewScore)
  }

  const loadFirebase = async () => {
    const data = await getAllApplicants('LHD2021')
    // trying to move the userID (key) into values side
      
    for (const key in data) {
      data[key].firebaseID = key
    }
    const arr = Object.values(data)
    setHackers(arr)
    setDisplayedHackers(arr)
    // console.log(arr)
  
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
            handleChangesfromScoring={handleChangesfromScoring}
          />
        </>
      )}
    </div>
  )
}

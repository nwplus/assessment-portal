import React from 'react'
import { useState, useEffect } from 'react'

import Table from '../components/table'
import ToolBar from '../components/toolbar'

export default function Assessments() {
  const [hackers, setHackers] = useState([
    {
      fname: 'Derek',
      lname: 'Chen',
      email: 'derek@nwplus.io',
      score: 7,
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
      score: 7,
    },
    {
      fname: 'test',
      lname: 'user',
      email: 'test@nwplus.io',
      score: 0,
    },
  ])
  const [selectedHacker, setSelectedHacker] = useState({})

  useEffect(() => {
    // pull data and setHackers
  }, [])

  return (
    <div>
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
    </div>
  )
}

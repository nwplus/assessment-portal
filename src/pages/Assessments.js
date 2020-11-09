import React from 'react'
import { useState, useEffect } from 'react'

import Table from '../components/Table'

export default function Assessments() {
  const [hackers, setHackers] = useState([
    {
      fname: 'Derek',
      lname: 'Chen',
      email: 'derek@nwplus.io',
      score: 7,
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

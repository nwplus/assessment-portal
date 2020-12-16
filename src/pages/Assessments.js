import React from 'react'
import { useState, useEffect } from 'react'
import Table from '../components/Table'
import ToolBar from '../components/toolbar'
import { SORT } from '../constants'
import { getAllApplicants } from '../utility/firebase'

const sort = (arr, type) => {
  switch (type) {
    case SORT.LAST_NAME:
      return arr.sort((a, b) => {
        return a.basicInfo.firstName?.localeCompare(b.basicInfo.firstName ?? '')
      })
    case SORT.FIRST_NAME:
      return arr.sort((a, b) => {
        return a.basicInfo.lastName?.localeCompare(b.basicInfo.lastName ?? '')
      })
    default:
    case SORT.TIMESTAMP:
      return arr.sort((a, b) => {
        return a.submission?.lastUpdated - b.submission?.lastUpdated
      })
  }
}

export default function Assessments() {
  const [hackers, setHackers] = useState([])

  // displayedHackers is what is displayed to users with search/filter/sort
  const [displayedHackers, setDisplayedHackers] = useState([])

  const [selectedHacker, setSelectedHacker] = useState({})

  const [sortType, setSortType] = useState(SORT.FIRST_NAME)

  const [reverse, setReverse] = useState(false)

  const [search, setSearch] = useState('')

  useEffect(() => {
    getAllApplicants('nwHacks2021', setHackers)
  }, [])

  useEffect(() => {
    let newHackers = sort(hackers, sortType)
    if (reverse) {
      newHackers = newHackers.reverse()
    }
    if (search !== '') {
      newHackers = newHackers.filter(hacker => {
        return (
          hacker.basicInfo.lastName?.includes(search) ||
          hacker.basicInfo.firstName?.includes(search) ||
          hacker.basicInfo.email?.includes(search)
        )
      })
    }
    setDisplayedHackers(newHackers)
  }, [hackers, sortType, search])

  return (
    <div>
      {hackers && (
        <>
          <ToolBar search={setSearch} reverse={setReverse} sort={setSortType} reversed={reverse} />
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

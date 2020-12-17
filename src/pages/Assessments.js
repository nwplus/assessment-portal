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
        return a.basicInfo.lastName
          ?.toLocaleLowerCase()
          .localeCompare(b.basicInfo.lastName?.toLocaleLowerCase())
      })
    case SORT.FIRST_NAME:
      return arr.sort((a, b) => {
        return a.basicInfo.firstName
          ?.toLocaleLowerCase()
          .localeCompare(b.basicInfo.firstName?.toLocaleLowerCase())
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

  const [sortType, setSortType] = useState(SORT.TIMESTAMP)

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
        const name = `${hacker.basicInfo.firstName?.toLocaleLowerCase()} ${hacker.basicInfo.lastName?.toLocaleLowerCase()}`
        return (
          name.includes(search.toLocaleLowerCase()) ||
          hacker.basicInfo.email?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      })
    }
    setDisplayedHackers([...newHackers])
  }, [hackers, sortType, search, reverse])

  useEffect(() => {
    if (!selectedHacker) return
    const hackerId = selectedHacker._id
    const newHacker = hackers.find(h => h._id === hackerId)
    if (newHacker) setSelectedHacker(newHacker)
  }, [hackers, selectedHacker])

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

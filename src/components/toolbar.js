import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'
import { useState } from 'react'
import Arrow from '../assets/arrow.svg'
import MagnifyingGlass from '../assets/magnifyingGlass.svg'
import Filter from '../assets/filter.svg'

const ToolBarContainer = styled.div`
  height: 69px;
  width: 100%;
  background: ${COLOR.TOOLBAR_GRAY};
  display: flex;
`

const Search = styled.input`
  width: 480px;
  height: 48px;
  margin: 8px 100px 8px 20px;
  padding: 0px 45px;
  font-size: 16px;
  display: inline-block;
  background-image: url(${MagnifyingGlass});
  background-position: 20px 15px;
  background-repeat: no-repeat;
  border: 1px solid ${COLOR.UNSCORED_GRAY};
  border-radius: 4px;
  box-sizing: border-box;
  float: left;
  :focus {
    color: ${COLOR.BLACK};
  }
`

const SortContainer = styled.div`
  display: flex;
`

const SortByText = styled.p`
  color: ${COLOR.DARK_GRAY};
  font-size: 16px;
`

const SortSelect = styled.select`
  height: 48px;
  margin: 8px 60px 8px 20px;
  color: ${COLOR.DARK_GRAY};
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid ${COLOR.UNSCORED_GRAY};
  padding: 0px 12px;
`

const DownArrow = styled.img`
  cursor: pointer;
`

const UpArrow = styled.img`
  cursor: pointer;
  transform: scaleY(-1);
`

const FilterIcon = styled.img`
  cursor: pointer;
  margin-left: 30px;
`

const TIMESTAMP = 'Timestamp'
const LAST_NAME = 'Last Name'
const FIRST_NAME = 'First Name'

export default function ToolBar(props) {
  const [isDescending, setIsDescending] = useState(false)

  const handleSearch = event => {
    const value = event.target.value
    props.setDisplayedHackers(
      props.hackers.filter(hacker => {
        const fullName = `${hacker.fname} ${hacker.lname}`
        return fullName.toLowerCase().includes(value.toLowerCase().trim())
      })
    )
  }

  const handleSortBy = event => {
    const value = event.target.value
    const temp = [...props.hackers]
    temp.sort((hackerOne, hackerTwo) => {
      switch (value) {
        case LAST_NAME:
          return hackerOne['lname'].localeCompare(hackerTwo['lname'])
        case FIRST_NAME:
          return hackerOne['fname'].localeCompare(hackerTwo['fname'])
        default:
          // sort by time
          return hackerOne['timestamp'] - hackerTwo['timestamp']
      }
    })
    props.setDisplayedHackers(temp)
  }

  const handleArrowClick = () => {
    const temp = [...props.displayedHackers]
    temp.reverse()
    props.setDisplayedHackers(temp)
    setIsDescending(!isDescending)
  }

  return (
    <ToolBarContainer>
      <Search
        type="text"
        placeholder="Search"
        onChange={event => {
          handleSearch(event)
        }}
      />
      <SortContainer>
        <SortByText>Sort by: </SortByText>
        <SortSelect
          onChange={event => {
            handleSortBy(event)
          }}
        >
          <option value={TIMESTAMP}>{TIMESTAMP}</option>
          <option value={LAST_NAME}>{LAST_NAME}</option>
          <option value={FIRST_NAME}>{FIRST_NAME}</option>
        </SortSelect>
      </SortContainer>
      {isDescending ? (
        <DownArrow src={Arrow} onClick={() => handleArrowClick()} />
      ) : (
        <UpArrow src={Arrow} onClick={() => handleArrowClick()} />
      )}
      <FilterIcon src={Filter} />
    </ToolBarContainer>
  )
}

import React from 'react'
import styled from 'styled-components'
import { COLOR, SORT } from '../constants'
import Arrow from '../assets/arrow.svg'
import MagnifyingGlass from '../assets/magnifyingGlass.svg'
import Filter from '../assets/filter.svg'

const ToolBarContainer = styled.div`
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
  transform: scale(1, -1);
`

const FilterIcon = styled.img`
  cursor: pointer;
  margin-left: 30px;
`

export default function ToolBar({ search, sort, reverse, reversed }) {
  return (
    <ToolBarContainer>
      <Search
        type="text"
        placeholder="Search"
        onChange={event => {
          search(event.target.value)
        }}
      />
      <SortContainer>
        <SortByText>Sort by: </SortByText>
        <SortSelect
          onChange={event => {
            sort(event.target.value)
          }}
        >
          <option value={SORT.TIMESTAMP}>{SORT.TIMESTAMP}</option>
          <option value={SORT.LAST_NAME}>{SORT.LAST_NAME}</option>
          <option value={SORT.FIRST_NAME}>{SORT.FIRST_NAME}</option>
          <option value={SORT.SCORE}>{SORT.SCORE}</option>
        </SortSelect>
      </SortContainer>
      {reversed ? (
        <DownArrow src={Arrow} onClick={() => reverse(reverse => !reverse)} />
      ) : (
        <UpArrow src={Arrow} onClick={() => reverse(reverse => !reverse)} />
      )}
      <FilterIcon src={Filter} />
    </ToolBarContainer>
  )
}

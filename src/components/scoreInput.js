// these are the blue buttons for the applicantScore sidebar

import React from 'react'
import Number from './numberIcon'

export default function ScoreInput({ label, score, handleClick }) {
  const arr = [...Array(6).keys()]

  return (
    <div style={{ paddingBottom: '12px' }}>
      <label>{label}</label>
      <div style={{ display: 'flex', paddingTop: '8px' }}>
        {arr.map(num => {
          return (
            <Number
              label={label}
              number={num}
              active={score === num}
              key={num}
              handleClick={handleClick}
            />
          )
        })}
      </div>
    </div>
  )
}

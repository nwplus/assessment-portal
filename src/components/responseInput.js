import React from 'react'
import styled from 'styled-components'

const TextArea = styled.div`
  border: 1px solid grey;
  padding: 15px;
`

export default function ResponseInput({ label, response }) {
  return (
    <div>
      <h5> {label} </h5>
      <TextArea style={{ resize: 'none', color: 'black', verticalAlign: 'middle' }}>
        {response}
      </TextArea>
    </div>
  )
}

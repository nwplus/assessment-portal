import React from 'react'

export default function ResponseInput({ label, response }) {
  return (
    <div>
      <h5> {label} </h5>
      <textarea
        disabled={true}
        readOnly={true}
        style={{ resize: 'none' }}
        cols={50}
        defaultValue={response}
      />
    </div>
  )
}

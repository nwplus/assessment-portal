import React, { useState } from 'react'
import PopoutWindow from './PopoutWindow'

export default function ResponseInput({ url, label, response, openable }) {
  const [open, setOpen] = useState(false)

  const ResponseArea = ({ fontSize }) => (
    <div
      style={{
        border: '1px solid grey',
        padding: '15px',
        fontSize,
        resize: 'none',
        color: 'black',
        verticalAlign: 'middle',
      }}
    >
      {!response ? (
        'No Response'
      ) : !url ? (
        response
      ) : (
        <a href={response} target="_blank" rel="noreferrer noopener">
          {response}
        </a>
      )}
    </div>
  )

  return (
    <div>
      <h5>
        {label}
        {openable && (
          <a
            href="#"
            onClick={e => {
              setOpen(!open)
            }}
          >
            {open ? 'close window' : 'open in new window'}
          </a>
        )}
      </h5>
      <ResponseArea />
      {open && (
        <PopoutWindow title={label} setWindowClosed={() => setOpen(false)}>
          <h5 style={{ fontSize: '20px' }}>{label}</h5>
          <ResponseArea fontSize={'20px'} />
        </PopoutWindow>
      )}
    </div>
  )
}

import React, { useState, useRef } from 'react'
import Button from '../components/Button'
import { getCSVData } from '../utility/firebase'
import { CSVLink } from 'react-csv'

export default function CSVButton() {
  const [csvData, setCSVData] = useState('')
  const downloadLink = useRef()
  return (
    <>
      <Button
        width="large"
        bColor="black"
        onClick={async () => {
          const data = await getCSVData()
          setCSVData(data)
          downloadLink.current.link.click()
        }}
      >
        Download CSV
      </Button>
      <CSVLink
        style={{ visibility: 'hidden' }}
        ref={downloadLink}
        filename="applicants.csv"
        data={csvData}
      />
    </>
  )
}

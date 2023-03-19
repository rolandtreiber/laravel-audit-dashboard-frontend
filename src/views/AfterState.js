import React from 'react'
import JSONPretty from 'react-json-pretty';

const AfterState = ({data}) => {
  return (
    <JSONPretty id="after-state" data={data}></JSONPretty>
  )
}

export default AfterState
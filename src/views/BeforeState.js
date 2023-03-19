import React from 'react'
import JSONPretty from 'react-json-pretty';

const BeforeState = ({data}) => {
  return (
    <JSONPretty id="before-state" data={data} ></JSONPretty>
  )
}

export default BeforeState
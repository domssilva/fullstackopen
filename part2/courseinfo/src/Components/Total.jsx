import React from 'react'

const Total = props => {
  let total = 0;
  const sum = props.parts.map(obj => total += obj.exercises)

  return (
    (
      <strong>Total of {total} exercises</strong>
    )
  )
}

export default Total
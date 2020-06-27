import React from 'react'

const Total = props => {
  let total = 0;
  const sum = props.parts.map(obj => total += obj.exercises)

  return (
    (
      <p>Number of exercises {total}</p>
    )
  )
}

export default Total
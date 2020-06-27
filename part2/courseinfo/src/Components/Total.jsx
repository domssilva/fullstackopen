import React from 'react'

const Total = ({parts}) => {
  const total = parts.reduce((total, amount) => total + Number(amount.exercises), 0)

  return (
    (
      <strong>Total of {total} exercises</strong>
    )
  )
}

export default Total

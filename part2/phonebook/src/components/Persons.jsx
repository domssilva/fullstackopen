import React from 'react'

export default function Persons({filtered}) {
  return (
    <>
      {
        filtered.map(({name, number}) => <p key={name}>
          <span>{name}</span> <span>{number}</span>
        </p>)
      }
    </>
  )
}

import React from 'react'

export default function Persons({filtered, deletePerson}) {
  return (
    <>
      {
        filtered.map(({name, number, id}) => (
          <>
            <div key={name}>
              <span>{name}</span> 
              <span style={{
                marginLeft: '8px',
              }}>{number}</span>
              <button 
                style={{
                  display: 'inline',
                  marginLeft: '15px',
                }}
                onClick={() => deletePerson(id)}  
              >delete</button>
            </div>
          </>
        ))
      }
    </>
  )
}

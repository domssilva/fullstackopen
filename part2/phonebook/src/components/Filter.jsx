import React from 'react'

export default function Filter({filterSearch, handleInputFilterChange}) {
  return (
    <div>
      filter shown with <input value={filterSearch} onChange={handleInputFilterChange}/>
  </div>
  )
}

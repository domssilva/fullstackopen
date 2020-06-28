import React from 'react'

export default function PersonForm({newName, handleInputNameChange, newNumber, handleInputNumberChange, addPerson}) {
  return (
      <form>
        <div>
          name: <input value={newName} onChange={handleInputNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
  )
}

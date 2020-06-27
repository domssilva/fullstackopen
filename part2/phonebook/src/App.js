import React, {useState} from 'react';

const App = () => {

  // for controlling the form input
  const [newName, setNewName] = useState('')
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    // prevent default event (page reload)
    event.preventDefault()

    // push new name to persons
    setPersons(
      persons.concat({
        name: newName
      })
    )

    // update input value
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
        {
          persons.map(
            ({name}) => <p key={name}>{name}</p>
          )
        }
    </div>
  )
}

export default App;

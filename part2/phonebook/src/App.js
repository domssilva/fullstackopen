import React, {useState} from 'react';

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '39-44-5432'
    }
  ])

  const handleInputNameChange = (event) => {
    const nameToAdd = event.target.value
    setNewName(nameToAdd)
  }

  const handleInputNumberChange = (event) => {
    const numberToAdd = event.target.value
    setNewNumber(numberToAdd)
  }

  const addPerson = (event) => {
    // prevent default event (page reload)
    event.preventDefault()

    // check if name is present
    let nameIsRepeated = false
    persons.filter(obj => {
      if (obj.name === newName) {
        nameIsRepeated = true
      }
    })

    if (nameIsRepeated) {
      alert(`${newName} is already added to phonebook`)
    } else {
      // push new name to persons
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
        })
      )
    }

    // update input value
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
        {
          persons.map(
            ({name, number}) => (
              <p key={name}>
                <span>{name}</span> <span>{number}</span>
              </p>
            )
          )
        }
    </div>
  )
}

export default App;

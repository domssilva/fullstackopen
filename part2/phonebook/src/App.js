import React, {useState} from 'react';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filterSearch, setFilterSearch] = useState('')

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
    setNewNumber('')
  }

  const handleInputFilterChange = (event) => {
    setFilterSearch(event.target.value)
  }

  let filtered = persons.filter(obj => obj.name.toLowerCase().includes(filterSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterSearch={filterSearch} handleInputFilterChange={handleInputFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleInputNameChange={handleInputNameChange}
        newNumber={newNumber}
        handleInputNumberChange={handleInputNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
        <Persons filtered={filtered}/>
    </div>
  )
}

export default App;

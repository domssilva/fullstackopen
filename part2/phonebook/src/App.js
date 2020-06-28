import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
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

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }

  useEffect(hook, [])

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

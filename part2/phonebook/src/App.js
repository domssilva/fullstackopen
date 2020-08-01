import React, {useState, useEffect} from 'react';
import axios from 'axios'

import manageNumbers from './services/manageNumbers'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [filterSearch, setFilterSearch] = useState('')

  useEffect(() => {
    manageNumbers
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

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

      let newPerson = {
        name: newName,
        number: newNumber,
      }

      manageNumbers
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          // update input value
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    let removePerson = window.confirm(`Delete ${id}?`)

    if (removePerson) {
      manageNumbers
        .remove(id)
        .then(response => {
          let updatedPersons = []
          persons.map(personObj => {
            if (personObj.id !== id) {
              updatedPersons.push(personObj)
            }
          })

          setPersons(updatedPersons)
        })
    }
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
        <Persons filtered={filtered} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;

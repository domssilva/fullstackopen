import React, {useState, useEffect} from 'react';

import manageNumbers from './services/manageNumbers'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Message from './components/Message'

const App = () => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [filterSearch, setFilterSearch] = useState('')
  const [message, setMessage] = useState(null)

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
      
      // 1. verify if number is the same
      persons.map(personObj => {
        if (personObj.name === newName) {
          if (personObj.number === newNumber) {
            alert(`${newName} already exists.`)
          } else {
            let updatedPerson = {
              name: personObj.name,
              number: newNumber,
              id: personObj.id,
            }

            manageNumbers
              .update(personObj.id, updatedPerson)
              .then(returnedUpdatedPerson => {
                // updating existing person's number
                setPersons(persons.map(p => p.id !== personObj.id ? p : returnedUpdatedPerson))
                setMessage(`updated ${newName}.`)
                setTimeout(() => {
                  // make notification message disappear after 5s
                  setMessage(null)
                }, 5000)
              })
          }
        }
      })
      // update persons
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
      }

      manageNumbers
        .create(newPerson)
        .then(response => {
          // creating new person
          setPersons(persons.concat(response))
          setMessage(`added ${newName}.`)
          setTimeout(() => {
            // make notification message disappear after 5s
            setMessage(null)
          }, 5000)
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
    <>
      <Message message={message}/>
      <main>
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
          <Persons 
            filtered={filtered} 
            deletePerson={deletePerson}
          />
      </main>
    </>
  )
}

export default App;

import React, {useState, useEffect} from 'react';

import axios from 'axios'
import CountryData from './components/CountryData'

function App() {

  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleInput = (event) => {
    setCountrySearch(event.target.value)
  }

  const getCountryDetails = (country) => {
    setCountrySearch(country)
  }

  // fetches countries data
  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
  }

  // when interface loads, useEffect executes hook
  useEffect(hook, [])
  
  let filtered = countries.filter(
    country => country.name.toLowerCase().includes(countrySearch.toLowerCase())
    )
    
    filtered = (filtered.length >= 10) ? '' : filtered
    
    let results

    if (filtered.length === 1) {
      results = (
        <CountryData data={filtered[0]}/>
      )
    } else {
      results = (
        <ul 
        style={{ listStyle: 'none'}}
        className="results">
          {
            (filtered !== '') ? 
            filtered.map(obj => (
              <li key={obj.name}>
                {obj.name}
                <button onClick={() => getCountryDetails(obj.name)}>view more</button>
              </li>
            )) : 'Too many matches, specify another filter'
          }
        </ul>
      )
    }
    
  
  return (
    <div className="App">
      {/* 
      The country to be shown is found by typing a search query into the search field.
      If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific: 
      */}

      <div className='search'>
        find countries <input onChange={handleInput} value={countrySearch}/>
      </div>
      {results}
    </div>
  );
}

export default App;

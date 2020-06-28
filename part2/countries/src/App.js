import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {

  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleInput = (event) => {
    setCountrySearch(event.target.value)
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
      console.log(filtered[0])

      results = (
        <>
          <div className="main">
            <h2>{filtered[0].name}</h2>
            <p>capital {filtered[0].capital}</p>
            <p>population {filtered[0].population}</p>
          </div>
          <div className="extra">
            <h5>languages</h5>
            <ul>
              {
                filtered[0].languages.map(
                  obj => <li key={obj.name}>{obj.name}</li>
                )
              }
            </ul>
            <img 
              style={{ width: '120px', height: '120px' }}
              src={filtered[0].flag} 
              alt="flag"/>
          </div>
        </>
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

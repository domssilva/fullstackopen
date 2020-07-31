import React, {useState, useEffect} from 'react'

import axios from 'axios'

const CountryData = ({data}) => {

    const [weatherData, setWeatherData] = useState({})
    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)
    const [windDirection, setWindDirection] = useState(0)

    useEffect(() => {
        const apiUrl =`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${data.capital}`

        // fetch weather data
        axios.get(apiUrl)
            .then(response => {
                setWeatherData(response.data)
            })
    }, [])

    useEffect(() => {
        
        try {
            setTemp(weatherData.current.temperature)
            setWind(weatherData.current.wind_speed)
            setWindDirection(weatherData.current.wind_dir)
        } catch {
            console.log(weatherData)
        }

    }, [weatherData])

    return (
        <section className="countrydata">
            <div className="main">
                <h2>{data.name}</h2>
                <p>capital {data.capital}</p>
                <p>population {data.population}</p>
            </div>
            <div className="extra">
                <h5>languages</h5>
                <ul>
                {
                    data.languages.map(
                    obj => <li key={obj.name}>{obj.name}</li>
                    )
                }
                </ul>
                <img 
                style={{ width: '120px', height: '120px' }}
                src={data.flag} 
                alt="flag"/>
            </div>
            <div className="weather">
                <p>current: {temp}°</p>
                <p>
                    <strong>wind: </strong>
                    {wind} mph direction {windDirection}
                </p>
            </div>
        </section>
    )
}

export default CountryData;

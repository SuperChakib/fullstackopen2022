import axios from "axios"
import { useEffect, useState } from "react"

const SingleCountry = ({ country }) => {
    const [weather, setWeather] = useState({});
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
            .then(response => setWeather(response.data))
    }, [country.capitalInfo.latlng, api_key])

    return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}<br/>area {country.area}</p>
      <h4>languages:</h4>
      <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags.svg} alt={'country flag'} width={150} height={100} />
      {JSON.stringify(weather) === '{}'
      ? null
      : <>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={'weather_icon'}/>
          <p>wind {weather.wind.speed} m/s</p>
        </>}
    </div>
)}

export default SingleCountry;
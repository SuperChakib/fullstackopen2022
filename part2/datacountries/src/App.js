import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ newFilter, setNewFilter }) => <div>
  <label>find countries </label>
  <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)}></input>
</div>

const SingleCountry = ({ country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags.svg} alt={'country flag'} width={150} height={100} />
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10 && countries.length < 250) {return <p>Too many matches, specify another filter</p>}
  else if (countries.length > 1 && countries.length <= 10) {return <div>{countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}</div>}
  else if (countries.length === 1) {return <SingleCountry country={countries[0]} />}
}

const App = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    })}, []);

  const [newFilter, setNewFilter] = useState('');

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  console.table(filteredCountries.map(country => country.name.common));

  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
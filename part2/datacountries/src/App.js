import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    })}, []);
  useEffect(() => {
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())))
    }, [countries, newFilter])

  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <Countries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  );
};

export default App;
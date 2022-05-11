import SingleCountry from "./SinleCountry"

const Countries = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length > 10 && filteredCountries.length < 250)
    return <div>Too many matches, specify another filter</div>
  else if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    return <div>{filteredCountries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => setFilteredCountries([country])}>show</button></p>)}</div>
  else if (filteredCountries.length === 1)
    return <SingleCountry country={filteredCountries[0]} />
}

export default Countries
const SingleCountry = ({ country }) => (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags.svg} alt={'country flag'} width={150} height={100} />
    </div>
  )

const Countries = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length > 10 && filteredCountries.length < 250)
    return <div>Too many matches, specify another filter</div>
  else if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    return <div>{filteredCountries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => setFilteredCountries([country])}>show</button></p>)}</div>
  else if (filteredCountries.length === 1)
    return <SingleCountry country={filteredCountries[0]} />
}

export default Countries
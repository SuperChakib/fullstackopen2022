import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addNewPerson = (e) => {
    e.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const dummyArray = [...persons].map((person) => JSON.stringify(person));
    if (dummyArray.includes(JSON.stringify(personObject))) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input
          value={newFilter}
          onChange={(e) => setNewFilter(e.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name:{' '}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
          )
          .map((person) => (
            <p key={person.name + person.number}>
              {person.name} {person.number}
            </p>
          ))}
      </div>
    </div>
  );
};

export default App;

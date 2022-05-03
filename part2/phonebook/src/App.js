import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addNewPerson = (e) => {
    e.preventDefault();
    const personObject = { name: newName };
    const dummyArray = [...persons].map((person) => JSON.stringify(person));
    if (dummyArray.includes(JSON.stringify(personObject))) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
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
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;

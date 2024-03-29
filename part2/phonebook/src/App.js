import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const changeFilter = (e) => setNewFilter(e.target.value);
  const changeName = (e) => setNewName(e.target.value);
  const changeNumber = (e) => setNewNumber(e.target.value);

  const updatePersonHelper = existingPerson => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(existingPerson.id, {...existingPerson, number: newNumber})
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
          setSuccessMessage(`Updated ${updatedPerson.name}`)
        })
        .catch((error) => {
          console.log(error.name);
          if (error.name === 'TypeError') {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter(p => p.name !== newName))
          } else {
            setErrorMessage(error.response.data.error)
          }
        })
    }
  }
  const createPersonHelper = () => {
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${returnedPerson.name}`)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })
  }
  const addNewPerson = (e) => {
    e.preventDefault();

    const dummyArray = persons.map(person => person.name + person.number);
    const existingPerson = persons.find(p => p.name === newName);
    if (dummyArray.includes(newName + newNumber)) alert(`${newName} is already added to phonebook with that number.`);
    else if (existingPerson) updatePersonHelper(existingPerson)
    else createPersonHelper()
    
    setTimeout(() => setSuccessMessage(null), 5000)
    setTimeout(() => setErrorMessage(null), 5000)
    setNewName('');
    setNewNumber('');
  };

  const removePerson = id => {
    if(window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter newFilter={newFilter} changeFilter={changeFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
    </div>
  );
};

export default App;

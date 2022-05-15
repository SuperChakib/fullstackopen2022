import React from 'react';

const Person = ({ name, number, removePerson }) => (
  <p>
    {name} {number} <button onClick={removePerson}>delete</button>
  </p>
);

const Persons = ({ persons, newFilter, removePerson }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        .map((person) => (
          <Person key={person.id} name={person.name} number={person.number} removePerson={() => removePerson(person.id)} />
        ))}
    </div>
  );
};

export default Persons;

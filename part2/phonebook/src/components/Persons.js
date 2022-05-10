import React from 'react';

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const Persons = ({ persons, newFilter }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        .map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
    </div>
  );
};

export default Persons;

import React from 'react';

const PersonForm = ({
  newName,
  changeName,
  newNumber,
  changeNumber,
  addNewPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={changeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={changeNumber} />
      </div>
      <div>
        <button type="submit" onClick={addNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;

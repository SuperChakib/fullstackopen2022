import React from 'react';

const Filter = ({ newFilter, changeFilter }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={changeFilter} />
    </div>
  );
};

export default Filter;

const Filter = ({ newFilter, setNewFilter }) => (
    <div>
      <label>find countries </label>
      <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)}></input>
    </div>)

export default Filter
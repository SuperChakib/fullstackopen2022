import { connect } from "react-redux"

import { setFilter } from "../reducers/filterReducer"

const Filter = props => {
  const handleChange = e => {
    props.setFilter(e.target.value)
  }

  const style = {
    marginBottim: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { setFilter })(Filter)
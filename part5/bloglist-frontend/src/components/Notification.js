import PropTypes from 'prop-types'

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage) {
    const errorStyle = {
      color: 'red',
      fontSize: '1.3em',
      fontWeight: 'bold',
      border: '2px solid red',
      borderRadius: 4,
      backgroundColor: 'lightgray',
      padding: 10,
      marginBottom: 10
    }
    return (
      <div style={errorStyle}>
        {errorMessage}
      </div>
    )
  }
  if (successMessage) {
    const successStyle = {
      color: 'green',
      fontSize: '1.3em',
      fontWeight: 'bold',
      border: '2px solid green',
      borderRadius: 4,
      backgroundColor: 'lightgray',
      padding: 10,
      marginBottom: 10
    }
    return (
      <div style={successStyle}>
        {successMessage}
      </div>
    )
  }
}

Notification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired
}

export default Notification
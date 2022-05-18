const Notification = ({ successMessage, errorMessage }) => {
    if (successMessage === null && errorMessage === null) return null;
    else if (errorMessage !== null) {
        const errorStyle = {
            color: 'red',
            backgroundColor: 'lightgrey',
            fontSize: 16,
            padding: 10,
            border: '3px solid red',
            borderRadius: 10,
            marginBottom: 10
        }
        return <div style={errorStyle}>
        {errorMessage}
    </div>
    }
    else if (successMessage !== null) {
        const succesStyle = {
            color: 'green',
            backgroundColor: 'lightgrey',
            fontSize: 16,
            padding: 10,
            border: '3px solid green',
            borderRadius: 10,
            marginBottom: 10
        }
        return <div style={succesStyle}>
        {successMessage}
    </div>
    }
}

export default Notification;
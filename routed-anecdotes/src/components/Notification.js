import React from 'react'

const Notification = ({ notification }) => {
    

    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    
      /* const errorMessageStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    } */
    
      /* if (message===null && errorMessage===null) {
        return null
      }
    
      if (errorMessage!==null) {
        return (
          <div className='error' style={errorMessageStyle}>
            {errorMessage}
          </div>
        )
      } */
      if (notification==='') {
          return null
      }
    return (
        <div className='message' style={messageStyle}>
          {notification}
        </div>
    
    )
}

export default Notification
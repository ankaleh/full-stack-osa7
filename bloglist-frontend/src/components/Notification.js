import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {

  const notification = useSelector(state => state.notification) //store.js:ssä asetettu viittaamaan notificationReduceriin
  //console.log(notification)
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorMessageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification===null) {
    return null
  }

  if (notification.includes('Virhe')) {
    return (
      <div className='error' style={errorMessageStyle}>
        {notification}
      </div>
    )
  }
  return (
    <div className='message' style={messageStyle}>
      {notification}
    </div>

  )
}

export default Notification
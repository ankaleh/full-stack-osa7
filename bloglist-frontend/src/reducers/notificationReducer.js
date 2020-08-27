const notificationDev = null
let timeoutId

const notificationReducer = (state=notificationDev, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data.content
  case 'SET_ERROR_NOTIFICATION':
    return action.data.content
  case 'REMOVE_NOTIFICATION':
    return notificationDev

  default: return state
  }
}

//actionit:

export const setNotification = (content, time) => {
  clearTimeout(timeoutId)
  console.log('TimeoutId on funktion alussa' ,timeoutId)
  return async dispatch => {
    await  dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content,
      }
    })
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time)
    console.log('TimeoutId on funktion lopussa' ,timeoutId)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer
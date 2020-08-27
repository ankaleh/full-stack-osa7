import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'NEW_USER':
    console.log('userReducerin LOGINISSA user: ', action.data.user)
    return action.data.user
  case 'LOGGED_IN':
    return action.data.user
  default:
    return state
  }
}

export const login = (kayttajatunnus, salasanaHash) => {
  return async dispatch => {
    const user = await loginService.login({ kayttajatunnus, salasanaHash, })
    window.localStorage.setItem('kirjautunutKayttaja', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'NEW_USER',
      data: {
        user
      }
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    console.log(user.nimi)
    dispatch({
      type: 'LOGGED_IN',
      data:
      {
        user,
      }
    })
  }
}

export default userReducer
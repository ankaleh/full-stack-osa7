import React, { useState, useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { login, setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import Notification from '../components/Notification'

const LoginForm = () => {
  const [kayttajatunnus, setKayttajatunnus] = useState('')
  const [salasanaHash, setSalasanaHash] = useState('')

  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(login(kayttajatunnus, salasanaHash))
      dispatch(setNotification('Kirjautuminen onnistui! Tervetuloa palveluun!', 5000))
      setKayttajatunnus('')
      setSalasanaHash('')

    } catch (exception) {
      dispatch(setNotification('Virhe: Kirjautuminen ei onnistunut. Tarkista käyttäjätunnus ja salasana.', 5000))
      setKayttajatunnus('')
      setSalasanaHash('')
    }
  }
  useEffect(() => { //kirjautuneen käyttäjän ensimmäinen sivun lautaus:
    const loggedUserJSON = window.localStorage.getItem('kirjautunutKayttaja')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Appin useEffectissä user: ', user)
      dispatch(setUser(user))
    }
  }, [dispatch])


  return (
    <div>
      <Notification/>
      <h2>Kirjaudu sisään alla olevalla lomakkeella</h2>

      <form onSubmit={handleLogin}>
        <div>Käyttäjätunnus</div>
        <input type="text" value={kayttajatunnus} name="Username"
          onChange={({ target }) => setKayttajatunnus(target.value)}
        />
        <div>Salasana</div>
        <input type="text" value={salasanaHash} name="Password"
          onChange={({ target }) => setSalasanaHash(target.value)}
        />
        <button type="submit" id='kirjaudu'>Kirjaudu</button>
      </form>

    </div>

  )
}
export default LoginForm
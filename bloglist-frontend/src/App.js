import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import SaveForm from './components/SaveForm'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
//import styled from 'styled-components'
import { Navigation, Button, Upper, Page } from './components/Style'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    return user
  })

  const blogs = useSelector(({  blogs  }) => {
    return blogs
  })

  const users = useSelector(({  users }) => {
    return users
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (user === null) {
    console.log('Returnissa!')

    return (
      <div>

        <Notification />

        <Togglable buttonLabel='Kirjautumislomake'>
          <LoginForm />
        </Togglable>

      </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    <Page>
      <Router>
        <Upper>
          <p>{user.nimi} kirjautuneena palveluun.

            <Button onClick={() => {
              window.localStorage.removeItem('kirjautunutKayttaja')
              window.location.reload()}}>
              Kirjaudu ulos
            </Button></p>
        </Upper>
        <Navigation>
          <Link style={padding} to='/'>Etusivu</Link>
          <Link style={padding} to='/blogs'>Blogit</Link>
          <Link style={padding} to='/users'>Käyttäjät</Link>
        </Navigation>
        <Switch>
          <Route path='/users/:id'>
            <User users={users}/>
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <Blog blogs={blogs}/>
          </Route>
          <Route path='/blogs'>
            <Blogs />
          </Route>

          <Route path='/'>

            <Notification />

            <Togglable buttonLabel='Lomake, jolla voit tallentaa uuden blogin'>
              <SaveForm />
            </Togglable>

          </Route>
        </Switch>
      </Router>
    </Page>
  )
}

export default App
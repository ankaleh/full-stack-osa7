import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from '../components/Notification'

const Users = () => {

  const users = useSelector(({ users }) => {
    return users
  })

  return (
    <div>
      <Notification/>
      <h2>Käyttäjät</h2>
      {users.map(user =>
        <div key={user.id}>
          <Link to={`/users/${user.id}`}><div>{user.nimi}</div></Link>
          <div>{user.blogit.length}</div>
        </div>)}

    </div>
  )
}

export default Users
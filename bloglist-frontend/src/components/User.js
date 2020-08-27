import React from 'react'
import { useParams } from 'react-router-dom'
import Notification from '../components/Notification'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  //Huom: törmäät tätä tehtävää tehdessäsi lähes varmasti virheeseen "Cannot read property 'name' of undefined".
  //Vika ilmenee jos uudelleenlataat sivun ollessasi yksittäisen käyttäjän sivulla.
  //Vian syynä on se, että jos mennään suoraan jonkin käyttäjän sivulle, eivät käyttäjien tiedot ole vielä ehtineet palvelimelta React-sovellukseen.
  //Ongelman voi kiertää ehdollisella renderöinnillä:

  if (!user) {
    return null
  }
  return (

    <div>
      <Notification/>
      <h2>{user.nimi}</h2>
      <div>on lisännyt blogit </div>

      {user.blogit.map(blog =>
        <li key={blog.id}>
          {blog.title}
        </li>
      )}

    </div>
  )
}

export default User
import React, { useState } from 'react'
import { removeBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Notification from '../components/Notification'
//import blogService from '../services/blogs'

const Blog = ({ blogs }) => {
  const [text, setText] = useState('')
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const user = useSelector(({ user }) => {
    return user
  })
  //Huomaa: törmäät tätä tehtävää tehdessäsi lähes varmasti virheeseen "Cannot read property 'name' of undefined".
  //Vika ilmenee jos uudelleenlataat sivun ollessasi yksittäisen käyttäjän sivulla.
  //Vian syynä on se, että jos mennään suoraan jonkin käyttäjän sivulle, eivät käyttäjien tiedot ole vielä ehtineet palvelimelta React-sovellukseen.
  //Ongelman voi kiertää ehdollisella renderöinnillä:

  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(false)
  const showOrNotToShow = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  let showToCreator = { display: '' }
  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }

  if (user && blog) {
    showToCreator = { display: user.kayttajatunnus===blog.user.kayttajatunnus ? '' : 'none' }
  } else {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event) => {
    event.preventDefault()
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Blogilla on nyt tykkäyksiä: ${blog.likes+1}.`, 5000))
    }  catch (exception) {
      dispatch(setNotification('Virhe: Blogin päivittäminen ei onnistunut. Yritä uudelleen.', 5000))
      console.log('Virhe!')
    }
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Haluatko varmasti poistaa blogin?')) {

      try {
        console.log(blog.id)
        dispatch(removeBlog(blog.id))
        dispatch(setNotification('Blogin poistaminen onnistui!', 5000))
      } catch (exception) {
        dispatch(setNotification('Virhe: Blogin poistaminen ei onnistunut. Yritä uudelleen.', 5000))
        console.log('Virhe!')
      }
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = {
      text,
    }
    console.log(comment, blog.id)
    dispatch(commentBlog(blog, comment))
    setText('')
  }


  return (
    <div style={blogStyle} className='blog'>
      <Notification/>
      <p id='authorAndTitle'>{blog.author}: {blog.title}</p>
      <button id='nayta' style={hideWhenVisible} onClick={showOrNotToShow}>Näytä blogin tiedot</button>
      <div id='showWhenVisible' style={showWhenVisible}>
        <p><b>lisääjä:</b> {blog.user.nimi} </p>
        <p id='url'><b>url:</b> {blog.url}</p>
        <p id='tykkayksia'>
          <b>tykkäyksiä:</b> {blog.likes}
          <button id='tykkaa' onClick={handleLike}>Tykkää</button>
        </p>

        <h2>Kommentit</h2>

        <form onSubmit={handleComment}>
          <div>Kirjoita kommentti</div>
          <input type="text" value={text} name="comment"
            onChange={({ target }) => setText(target.value)}
          />
          <button type="submit" >Tallenna kommentti</button>
        </form>


        {blog.comments.map(comment =>
          <li key={comment.id}>
            {comment.text}
          </li>
        )}
        <button id='poistaBlogiNappi' style={showToCreator} onClick={handleDelete}>Poista blogi</button>
        <button id='suljeNappi'onClick={showOrNotToShow}>Sulje</button>
      </div>
    </div>

  )

}

export default Blog

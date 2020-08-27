import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const SaveForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSaveBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title, author, url, comments: []
    }
    setTitle('')
    setAuthor('')
    setUrl('')

    try {
      dispatch(addNewBlog(blog))
      dispatch(setNotification(`Uusi blogi lisättiin: ${author}, ${title}.`, 5000))
    }  catch (exception) {
      dispatch(setNotification('Virhe: Blogin lisääminen ei onnistunut. Yritä uudelleen.', 5000))
      console.log('Virhe!')
    }
  }

  return (
    <div>
      <h2>Tallenna uusi blogi</h2>

      <form id='lomake' onSubmit={handleSaveBlog}>

        <div>Title:</div>
        <input id='title' type="text" value={title} name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <div>Author:</div>
        <input id='author' type="text" value={author} name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <div>Url:</div>
        <input id='uri' type="text" value={url} name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <button id='tallenna' type="submit">Tallenna</button>

      </form>
    </div>
  )
}

/* SaveForm.propTypes = {
  addBlog: PropTypes.func.isRequired
} */

export default SaveForm
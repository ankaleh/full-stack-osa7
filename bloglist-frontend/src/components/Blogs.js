import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from '../components/Notification'

const Blogs = () => {

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  return (
    <div>
      <Notification/>
      <h2>Blogit</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}><div>{`${blog.author}: ${blog.title}`}</div></Link>
        </div>)}

    </div>
  )
}

export default Blogs
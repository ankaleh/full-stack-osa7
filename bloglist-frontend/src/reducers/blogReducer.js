/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'


const blogReducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  default:
    return state
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'REMOVE':
    return state.filter(b => b.id !== action.data.id)
  case 'UPDATE':
    return state.map(b =>
      b.id !== action.data.id ? b : action.data)
  }
}

//actionit:
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addNewBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data:
      {
        ...newBlog }
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes+1 })
    console.log(updatedBlog)
    dispatch({
      type: 'UPDATE',
      data:
        { ...blog, likes: blog.likes+1 }
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const newComment = await blogService.commentBlog(blog.id, comment)
    const updatedBlog = { ...blog, comments: [ ...blog.comments, newComment] }
    dispatch({
      type: 'UPDATE',
      data:
        { ...updatedBlog }
    })
  }
}


export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    console.log(id)
    dispatch({
      type: 'REMOVE',
      data: {
        id: id
      }
    })
  }
}

export default blogReducer

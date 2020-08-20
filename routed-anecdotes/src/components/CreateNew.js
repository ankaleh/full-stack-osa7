import React from 'react'
import  { useField } from '../hooks/index'

const CreateNew = (props) => {

    const contentInput = useField('text')
    const authorInput = useField('text')
    const infoInput = useField('text')
    const content = contentInput.value
    const author = authorInput.value
    const info = infoInput.value
    
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content,
        author,
        info,
        votes: 0
      })
      
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...{...contentInput, reset: null}} />
          </div>
          <div>
            author
            <input {...{...authorInput, reset: null}} />
          </div>
          <div>
            url for more info
            <input {...{...infoInput, reset: null}}/>
          </div>
          <button>create</button>
        </form>
        <button onClick={()=>{
            contentInput.reset()
            authorInput.reset()
            infoInput.reset()
        }}>reset</button>
      </div>
    )
  
}
export default CreateNew
import React, { useState } from 'react'
import Country from './components/Country'
import { useCountry, useField } from './hooks/index'


const App = () => {
  const nameInput = useField('text')
  
  const [name, setName] = useState('')
  const country = useCountry(name)

  

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    nameInput.reset()
  }
  
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...{...nameInput, reset: null}} />
        <button type='submit'>find</button>
      </form>
  
      <Country country={country} />
    </div>
  )
  
}

export default App
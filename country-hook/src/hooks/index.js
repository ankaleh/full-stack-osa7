import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  console.log('useField-hookin alussa')
    const onChange = (event) => {
        //event.preventDefault()
      setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }
    console.log('useField-hookin lopussa')
    return {
      type,
      value,
      onChange,
      reset,
    }
  }
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    console.log('useCountry-hookin alussa')
    
    useEffect(() => {

        if (name) {
                axios
                    .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
                    .then((response) => {  
                        console.log(response.status) 
                        setCountry({...response.data[0], found: true})
      
                })
                .catch(error => {
                    // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
                    const response = error.response.data
                    console.log(response)
                    if (response.status===404) {
                        setCountry({found: false})
                    }
                    
                })
        
        } else {
            setCountry(null)
        }
    
    }, [name])

  console.log('useCountry-hookin lopussa')
  
    return country
} 
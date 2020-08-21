import axios from 'axios'
const baseUrl = '/api/notes'

/* let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
} */
export const useResource = () => {

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
      }
      
      
    const create = async newObject => {
        const response = await axios.post(baseUrl, newObject)
        return response.data
      }
      
      /* const update = (id, newObject) => {
        const request = axios.put(`${ baseUrl } /${id}`, newObject)
        return request.then(response => response.data)
      }
       */
      //Custom-hook useResource siis palauttaa (tilahookien tapaan) kaksialkioisen taulukon. 
      //Taulukon ensimmäinen alkio sisältää resurssin kaikki oliot 
      //ja toisena alkiona on olio, jonka kautta 
      //resurssia on mahdollista manipuloida, mm. lisäämällä uusia olioita.:

       return (
           [{getAll, create}, {/* olio, jonka kautta resurssia on mahd. manipuloida esim. lisäämällä uusia olioita */} ]
       )
}


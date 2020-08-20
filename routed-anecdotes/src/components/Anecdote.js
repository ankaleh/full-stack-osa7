import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id //tarvittaessa muutettava numeroksi koodilla Number(id)
    console.log(id)
    const anecdote = anecdotes.find(a => a.id===id)
    return (
        <div>
            <p>Anekdootilla</p>
            <h2>{anecdote.content}</h2>
            <p>on ääniä {anecdote.votes} kpl.</p>
            <p>Lisää anekdootin aiheesta: <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}
export default Anecdote
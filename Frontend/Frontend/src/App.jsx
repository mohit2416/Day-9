import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [notes, setNotes] = useState([])


  function fetchNote() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }


  useEffect(() => {
    fetchNote()
  }, [])

    function handelSubmit(e){
      e.preventDefault()
      const { title, description } = e.target.elements

      console.log(title.value,description.value);

      axios.post("http://localhost:3000/api/notes",{
        title:title.value,
        description:description.value
      })
      .then(res => {
        console.log(res.data);

         fetchNote()
      })
      
    }

    function handelDeleteNote(noteID){
      axios.delete("http://localhost:3000/api/notes/"+noteID)
      .then(res => {
        console.log(res.data)
        fetchNote()
      })
    }
  return (
    <>

    <form className='note-create-form' onSubmit={handelSubmit}>
    <input name='title' type="text" placeholder='Enter Title' />
    <input name='description' type="text" placeholder='Enter Description '/>
    <button>Create Note</button>
    </form>

      <div className="notes">
        {notes.map(note => {
          return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{handelDeleteNote(note._id)}}>Delete Note</button>
          </div>
        })
        }
      </div>
    </>
  )
}

export default App

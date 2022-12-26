import '../styles/App.scss'
import { useState, useEffect } from 'react'
import List from '../components/List'
import SelectedNote from '../components/SelectedNote'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Note, List as ListType, ActiveNote } from '../types/List.types'

function Kanban() {
  const URL = 'http://localhost:8080'

  const [activeNote, setActiveNote] = useState<ActiveNote>({
    listId: undefined,
    note: undefined,
  }) //when selecting a note, open a modal asking to edit the text, delete the note, or change the list the note is in.
  const [data, setData] = useState<ListType[]>([])

  useEffect(() => {
    axios.get(`${URL}/tasks`).then((res) => {
      setData(res.data)
    })
  }, [])

  const handleNoteDelete = (listId: string, noteId: string) => {
    const selectedList = data.find((lists) => lists.id === listId) //This selects the list the note is in

    const updatedNotes = selectedList?.notes?.filter(
      (note) => note.id !== noteId
    ) //selectedList is an object
    const updatedList = {
      ...selectedList,
      notes: updatedNotes,
    }

    axios.put(`${URL}/tasks/${listId}`, updatedList)

    setData(data.map((list) => (list.id === listId ? updatedList : list)))
    setActiveNote({ listId: undefined, note: undefined })
  }

  const handleAddNote = (listId: string) => {
    const selectedList = data.find((list) => list.id === listId) //when clicking `Add Note`, we need to know what list its from. This selects the list

    const newNote = {
      id: uuidv4(),
      body: 'New Note',
    }

    const updatedList = {
      //this adds the note to the respective list
      ...selectedList,
      notes: selectedList.notes.concat(newNote),
    }

    axios.put(`${URL}/tasks/${listId}`, updatedList)

    setData(data.map((list) => (list.id === listId ? updatedList : list))) //updates the state with the updated list
  }

  const handleNoteClick = (listId: string, noteId: string) => {
    const newArray: Note[] = []
    data.map((lists) => newArray.push(lists.notes))

    setActiveNote({
      listId,
      note: newArray.find((note) => note.id === noteId),
    })
  }

  const handleNoteClose = () =>
    setActiveNote({ listId: undefined, note: undefined })

  return (
    <div>
      {!!activeNote.note && (
        <SelectedNote
          handleNoteClose={handleNoteClose}
          handleNoteDelete={handleNoteDelete}
          activeNote={activeNote}
        />
      )}
      <h1>Kanban View</h1>
      <div className='kanban-container'>
        {data.map((list) => (
          <List
            handleAddNote={handleAddNote}
            handleNoteClick={handleNoteClick}
            list={list}
          />
        ))}
      </div>
    </div>
  )
}

export default Kanban

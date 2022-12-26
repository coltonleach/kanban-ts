import { Note, List as ListType } from '../types/List.types'

type ListProps = {
  list: ListType
  handleAddNote: (listId: string) => void
  handleNoteClick: (listId: string, noteId: string) => void
}

const List = ({ list, handleAddNote, handleNoteClick }: ListProps) => {
  return (
    <div className='list-container'>
      <textarea value={list.title} rows={1} />
      {list.notes?.map((note: Note) => (
        <p key={note.id} onClick={() => handleNoteClick(list.id, note.id)}>
          {note.body}
        </p>
      ))}
      <p className='add-note' onClick={() => handleAddNote(list.id)}>
        Add Note
      </p>
    </div>
  )
}

export default List

import { Note, ActiveNote } from '../types/List.types'
import { RiCloseLine } from 'react-icons/ri'

type SelectedNoteProps = {
  activeNote: ActiveNote
  handleNoteClose: () => void
  handleNoteDelete: (listId: number, noteId: number) => void
}

const SelectedNote = ({
  activeNote,
  handleNoteClose,
  handleNoteDelete,
}: SelectedNoteProps) => {
  return (
    <div className='selected-note-modal'>
      <div className='selected-note-container'>
        <textarea value={activeNote.note?.body} rows={1} />
        <span onClick={handleNoteClose} className='close'>
          <RiCloseLine />
        </span>
        <div className='btn-container'>
          <button className='btn-save'>Save</button>
          <button
            className='btn-delete'
            onClick={() =>
              handleNoteDelete(activeNote.listId, activeNote.note?.id)
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectedNote

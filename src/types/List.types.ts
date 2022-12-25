export type Note = {
  id: number
  body: string
}

export type List = {
  id: number
  title: string
  notes?: Note[]
}

export type ActiveNote = {
  listId: number | undefined
  note: Note | undefined
}

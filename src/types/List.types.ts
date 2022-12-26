export type Note = {
  id: string
  body: string
}

export type List = {
  id: string
  title: string
  notes?: Note[]
}

export type ActiveNote = {
  listId?: string
  note?: Note
}

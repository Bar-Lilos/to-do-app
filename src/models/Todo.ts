export type Todo = {
  id: number
  text: string
  completed: boolean
  createdTime?: Date
  tags?: TodoTag[]
}

export type TodoTag = {
  id: number
  text: string
}
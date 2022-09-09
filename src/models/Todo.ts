export interface Todo {
  id?: number
  text: string
  completed: boolean
  createdTime: string
  lastUpdated: Date
  tags?: TodoTag[]
}

export interface FetchedTodo extends Omit<Todo, 'id'> {
  id: number
}

export type TodoTag = {
  id: number
  text: string
}
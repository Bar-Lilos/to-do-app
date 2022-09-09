export interface Todo {
  id?: number
  text: string
  completed: boolean
  createdTime: string
  tags?: TodoTag[]
}

export interface FetchedTodo extends Omit<Todo, 'id' | 'createdTime'> {
  id: number
  createdTime: Date
}

export type TodoTag = {
  id: number
  text: string
}
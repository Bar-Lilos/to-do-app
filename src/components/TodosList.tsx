import { Todo } from 'models/Todo';
import React, { useState } from 'react';
import TodoContainer from 'components/TodoContainer';
 
type Props = {
    todos: Todo[]
    editTodo: (todo: Todo) => void
    deleteTodo: (todo: Todo) => void
}

const TodosList: React.FC<Props> = ({todos, editTodo, deleteTodo}) => {    
    return (
        <div className='todos-list'>
            {
                todos.map((todo: Todo, index: number) => (
                    <TodoContainer
                        key={todo.id}
                        todo={todo}
                        editTodo={() => editTodo(todo)}
                        deleteTodo={() => deleteTodo(todo)}
                    />
                ))
            }
        </div>
    );
}

export default TodosList;
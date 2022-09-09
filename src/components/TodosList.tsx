import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Todo } from 'models/Todo';
import TodoContainer from 'components/TodoContainer';
 
type Props = {
    todos: Todo[]
    editTodo: (todo: Todo) => void
    deleteTodo: (todo: Todo) => void
    addNewTodo: () => void
}

const TodosList: React.FC<Props> = ({todos, editTodo, deleteTodo, addNewTodo}) => {   
    return (
        <div className='d-flex flex-column todos-list'>
            <Button
                id='newTodo'
                name='newTodo'
                className='btn-success col-3 mb-4'
                onClick={addNewTodo}
            >
                +
            </Button>

            {
                todos.map((todo: Todo) => (
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
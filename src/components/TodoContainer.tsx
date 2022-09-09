import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Todo } from 'models/Todo';
 
type Props = {
    todo: Todo
    editTodo: () => void
    deleteTodo: () => void
}

const TodoContainer: React.FC<Props> = ({todo, editTodo, deleteTodo}) => {
    return (
        <div className='col-12 d-flex flex-row todo-container mb-4'>
            <div className='col-9'>
                <div>{todo.text}</div>
                <div>{todo.completed.toString()}</div>
                <div>{todo.createdTime}</div>
            </div>
            
            <div className='col-3 d-flex flex-row'>
                <Button
                    id='deleteTodo'
                    name='deleteTodo'
                    className='col-5 btn-danger me-2 h-50 mt-4'
                    onClick={deleteTodo}
                >
                    Delete
                </Button>

                <Button
                    id='deleteTodo'
                    name='deleteTodo'
                    className='col-5 btn-success h-50 mt-4'
                    onClick={editTodo}
                >
                    Edit
                </Button>
            </div>
        </div>
    );
}

export default TodoContainer;
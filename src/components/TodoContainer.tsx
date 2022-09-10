import React, { useState, useEffect } from 'react';
import { Button, Label, UncontrolledTooltip } from 'reactstrap';
import { Todo } from 'models/Todo';
 
type Props = {
    todo: Todo
    editTodo: () => void
    deleteTodo: () => void
}

const TodoContainer: React.FC<Props> = ({todo, editTodo, deleteTodo}) => {
    return (
        <div className='col-12 d-flex flex-row px-4 mb-5 ps-3 todo-container'>
            <UncontrolledTooltip
                placement='left'
                target={"todo-name-" + todo.id}
            >
                <div>{todo.completed ? 'Completed' : 'Not Completed'}</div>
                <div>{todo.createdTime}</div>
            </UncontrolledTooltip>

            <div className='d-flex flex-row todo-details me-3'>
                {
                    todo.completed
                    ?
                    <img
                        id={"todo-name-" + todo.id}
                        src={process.env.PUBLIC_URL + '/completed.png'}
                        className='todo-completed me-2'
                    />
                    :
                    <img
                        id={"todo-name-" + todo.id}
                        src={process.env.PUBLIC_URL + '/notCompleted.png'}
                        className='todo-not-completed me-2'
                    />
                }
                
                <div id="todo-name" className='align-self-center todo-name'>{todo.text}</div>
            </div>
            
            <div className='col-7 me-0 align-self-center todo-actions'>
                <Button
                    id='editTodo'
                    name='editTodo'
                    className='btn-success me-3'
                    onClick={editTodo}
                >
                    Edit
                </Button>

                <Button
                    id='deleteTodo'
                    name='deleteTodo'
                    className='btn-danger'
                    onClick={deleteTodo}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default TodoContainer;
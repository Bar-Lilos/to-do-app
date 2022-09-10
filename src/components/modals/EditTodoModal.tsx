import React, { useState, useEffect } from 'react';
import { Label, Input, Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useQuery } from 'react-query';
import { Todo } from 'models/Todo';
 
type Props = {
    editedTodo: Todo
    setEditedTodo: (todo: Todo) => void
    saveTodo: () => void
}

const EditTodoModal: React.FC<Props> = ({editedTodo, setEditedTodo, saveTodo}) => {
    return (
        <>
            <ModalHeader>{editedTodo.id ? 'Edit' : 'New Todo'}</ModalHeader>

            <ModalBody>
                <div className='col-12 d-flex flex-row'>
                    <Label for="editedTodoName" className='col-3 me-0 align-self-end'>Task Name:</Label>

                    <Input
                        id='editedTodoName'
                        name='editedTodoName'
                        type='text'
                        className='edited-todo-name'
                        invalid={editedTodo.text === ''}
                        valid={editedTodo.text !== ''}
                        value={editedTodo.text}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEditedTodo({...editedTodo, text: e.currentTarget.value})}
                    />
                </div>

                {
                    editedTodo.id &&
                    <div className='d-flex flex-row'>
                        <Label for="todoCompleted" className='mt-4'>Completed?</Label>

                        <Input
                            id='editedTodoCompleted'
                            name='editedTodoCompleted'
                            type='checkbox'
                            className='todo-completed-checkbox'
                            checked={editedTodo.completed}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setEditedTodo({...editedTodo, completed: !editedTodo.completed})}
                        />
                    </div>
                }
            </ModalBody>

            <ModalFooter>
                <Button
                    id='updateTodo'
                    name='updateTodo'
                    className='btn-success'
                    onClick={saveTodo}
                    disabled={editedTodo.text === ''}
                >
                    Save
                </Button>
            </ModalFooter>
        </>
    );
}

export default EditTodoModal;
import React from 'react';
import { Label, Input, Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Todo } from 'models/Todo';
import extractIsoDate from 'functions/extractIsoDate';
import getTomorrow from 'functions/getTomorrow';
 
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
                    <Label for="editedTodoName" className='col-3 me-0 align-self-end'>Name:</Label>

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

                <div className='col-12 d-flex flex-row mt-4'>
                    <Label for="editedTodoName" className='col-3 me-0 align-self-end'>Deadline:</Label>

                    <Input
                        id='editedTodoDeadline'
                        name='editedTodoDeadline'
                        type='date'
                        className='edited-todo-deadline'
                        invalid={editedTodo.deadline.getDate() < getTomorrow().getDate()}
                        valid={editedTodo.deadline.getDate() >= getTomorrow().getDate()}
                        value={extractIsoDate(true, editedTodo.deadline.toString())}
                        required={true}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEditedTodo({...editedTodo, deadline: new Date(e.currentTarget.value)})}
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
                    disabled={editedTodo.text === '' || editedTodo.deadline.getDate() < getTomorrow().getDate()}
                >
                    Save
                </Button>
            </ModalFooter>
        </>
    );
}

export default EditTodoModal;
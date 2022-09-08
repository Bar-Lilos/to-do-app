import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Button, Input, Modal, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { Todo } from 'models/Todo';
import TodosList from 'components/TodosList';
import TodoModal from 'components/TodoModal';
import getAllTodos from 'axios/http/getAllTodos';
import postTodo from 'axios/http/postTodo';
import patchTodo from 'axios/http/patchTodo';
import deleteTodo from 'axios/http/deleteTodo';

const initialTodo: Todo = {
    id: 0,
    text: '',
    completed: false,
}
 
const Todos: React.FC = () => {
    const [allTodos, setAllTodos] = useState<Todo[]>();
    const [todoQuery, setTodoQuery] = useState<string>(``);
    const [editedTodo, setEditedTodo] = useState<Todo>(initialTodo);
    const [newTodo, setNewTodo] = useState<string>();

    const [editTodoModal, setEditTodoModal] = useState(false);
    const toggleEditTodoModal = () => setEditTodoModal(!editTodoModal);

    const [addTodoModal, setAddTodoModal] = useState(false);
    const toggleAddTodoModal = () => setAddTodoModal(!addTodoModal);

    const [removeTodoModal, setRemoveTodoModal] = useState(false);
    const toggleRemoveTodoModal = () => setRemoveTodoModal(!removeTodoModal);

    const {
        data: fetchedTodos,
        isLoading: todosLoading,
        refetch: refetchTodos
    } = useQuery<Todo[]>('todos fetching', () => getAllTodos(todoQuery))

    useEffect(() => {
        if (!todosLoading && fetchedTodos) {
            setAllTodos(fetchedTodos.map((todo: Todo) => {
                return todo;
            }))
        }
    }, [todosLoading])

    useEffect(() => {
        refetchTodos();
    }, [todoQuery])

    const updateTodo = async () => {
        if (!editedTodo.text || editedTodo.text === '') {
            alert('Please insert a task name');
            return;
        }

        const updatedTodo = {
            id: editedTodo.id,
            text: editedTodo.text,
            completed: editedTodo.completed
        }

        patchTodo(updatedTodo).then((response) => {
            alert('Task successfully updated');
            refetchTodos();
            toggleEditTodoModal();
        })
        .catch((error) => {
            alert("An error occured");
            console.log("error: ", error.message);
        })
    }

    const addTodo = async () => {
        if (!newTodo || newTodo === '') {
            alert('Please insert a task name');
            return;
        }

        postTodo(newTodo).then((response) => {
            alert('Task successfully added');
            setNewTodo('');
            refetchTodos();
            toggleAddTodoModal();
        })
        .catch((error) => {
            alert("An error occured, try again");
            console.log("error: ", error.message);
        })

    }

    const removeTodo = async () => {
        deleteTodo(editedTodo.id).then((response) => {
            alert('Task successfully removed');
            refetchTodos();
            toggleRemoveTodoModal();
        })
        .catch((error) => {
            alert("An error occured, try again");
            console.log("error: ", error.message);
        })
    }
        
    return (
        <div className='col-12 d-felx flex-column'>
            <div className='d-flex flex-row mb-4 justify-content-between'>
                <div className='col-6 d-flex flex-row'>
                    <Input
                        id='todoNameFilter'
                        name='todoNameFilter'
                        type='text'
                        className='text me-4'
                        placeholder='Name filter...'
                        value={todoQuery}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setTodoQuery(e.currentTarget.value)}
                    />

                    <Button
                        id='filterReset'
                        name='filterReset'
                        className='btn-danger'
                        onClick={() => setTodoQuery(``)}
                    >
                        Reset
                    </Button>
                </div>

                <div>
                    <Button
                        id='newTodo'
                        name='newTodo'
                        className='btn-success'
                        onClick={() => {
                            setEditedTodo(initialTodo);
                            toggleAddTodoModal();
                        }}
                    >
                        +
                    </Button>
                </div>
            </div>

            {/* <TodoModal
                isOpen={modal}
                toggle={toggle}
                todo={editedTodo}
            /> */}
                
            <Modal
                isOpen={editTodoModal}
                toggle={toggleEditTodoModal}
            >
                <ModalHeader>Edit</ModalHeader>

                <ModalBody>
                    <div className='col-12 d-flex flex-row'>
                        <Label for="todoName" className='col-3 me-0'>Task Name:</Label>

                        <Input
                            id='todoName'
                            name='todoName'
                            type='text'
                            className='edited-todo-name'
                            value={editedTodo.text}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setEditedTodo({...editedTodo, text: e.currentTarget.value})}
                        />
                    </div>

                    <div className='d-flex flex-row'>
                        <Label for="todoCompleted" className='mt-4'>Completed?</Label>

                        <Input
                            id='todoCompleted'
                            name='todoCompleted'
                            type='checkbox'
                            className='todo-completed-checkbox'
                            checked={editedTodo.completed}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setEditedTodo({...editedTodo, completed: !editedTodo.completed})}
                        />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        id='updateTodo'
                        name='updateTodo'
                        className='btn-success'
                        onClick={() => updateTodo()}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={addTodoModal}
                toggle={toggleAddTodoModal}
            >
                <ModalHeader>Add</ModalHeader>

                <ModalBody>
                    <Label for="newTodoText">Task Name:</Label>

                    <Input
                        id='newTodoText'
                        name='newTodoText'
                        type='text'
                        className=''
                        placeholder='Insert task...'
                        value={newTodo}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setNewTodo(e.currentTarget.value)}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        id='addTodo'
                        name='addTodo'
                        className='btn-success'
                        onClick={() => addTodo()}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={removeTodoModal}
                toggle={toggleRemoveTodoModal}
            >
                <ModalHeader>Warning</ModalHeader>

                <ModalBody>
                    Are you sure you want to delete?

                    <div className='d-flex flex-row`'>
                        <Button
                            id='removeTodo'
                            name='removeTodo'
                            className='btn-success'
                            onClick={() => removeTodo()}
                        >
                            Yes
                        </Button>

                        <Button
                            id='ignore'
                            name='ignore'
                            className='btn-danger'
                            onClick={toggleRemoveTodoModal}
                        >
                            No
                        </Button>
                    </div>                    
                </ModalBody>
            </Modal>

            {
                allTodos &&
                <TodosList
                    todos={allTodos}
                    editTodo={(todo: Todo) => {
                        setEditedTodo(todo);
                        toggleEditTodoModal();
                    }}
                    deleteTodo={(todo: Todo) => {
                        setEditedTodo(todo);
                        toggleRemoveTodoModal();
                    }}
                />
            }
        </div>
    );
}

export default Todos;
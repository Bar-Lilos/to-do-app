import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { format } from "date-fns";
import { parseISO } from 'date-fns/esm';
import { FetchedTodo, Todo } from 'models/Todo';
import TodosList from 'components/TodosList';
import TodoModal from 'components/TodoModal';
import getAllTodos from 'axios/http/getAllTodos';
import postTodo from 'axios/http/postTodo';
import patchTodo from 'axios/http/patchTodo';
import deleteTodo from 'axios/http/deleteTodo';
import TodoFilter from 'components/TodoFilter';

const initialTodo: Todo = {
    text: '',
    completed: false,
}
 
const Todos: React.FC = () => {
    const [allTodos, setAllTodos] = useState<Todo[]>();
    const [todoQuery, setTodoQuery] = useState<string>(``);
    const [editedTodo, setEditedTodo] = useState<Todo>(initialTodo);
    const [shouldDelete, setShouldDelete] = useState<boolean>(false);

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const {
        data: fetchedTodos,
        isLoading: todosLoading,
        refetch: refetchTodos
    } = useQuery<FetchedTodo[]>('todos fetching', () => getAllTodos(todoQuery))

    useEffect(() => {
        if (!todosLoading && fetchedTodos) {
            setAllTodos(fetchedTodos.map((todo: FetchedTodo) => {
                return {...todo, creationDate: format(parseISO(todo.createdTime!.toLocaleString()), 'dd/mm/yyyy')}
            }))
        }
    }, [fetchedTodos])

    useEffect(() => {
        refetchTodos();
    }, [todoQuery])

    const saveTodo = async () => {
        if (!editedTodo.text || editedTodo.text === '') {
            alert('Please insert a task name');
            return;
        }

        if (editedTodo.id) {
            patchTodo(editedTodo).then((response) => {
                alert('Task successfully updated');
                refetchTodos();
                toggleModal();
            })
            .catch((error) => {
                alert("An error occured");
                console.log("error: ", error.message);
            })
        }
        else {
            postTodo(editedTodo).then((response) => {
                alert('Task successfully added');
                setEditedTodo(initialTodo);
                refetchTodos();
                toggleModal();
            })
            .catch((error) => {
                alert("An error occured, try again");
                console.log("error: ", error.message);
            })
        }        
    }

    const removeTodo = async () => {
        deleteTodo(editedTodo.id!).then((response) => {
            alert('Task successfully removed');
            refetchTodos();
            toggleModal();
            setShouldDelete(false);
        })
        .catch((error) => {
            alert("An error occured, try again");
            console.log("error: ", error.message);
        })
    }
        
    return (
        <div className='col-12 d-felx flex-column'>
            <div className='d-flex flex-row mb-4 justify-content-between'>
                <TodoFilter
                    todoQuery={todoQuery}
                    setTodoQuery={setTodoQuery}
                />
            </div>

            <TodoModal
                isOpen={modal}
                toggle={toggleModal}
                editedTodo={editedTodo}
                setEditedTodo={setEditedTodo}
                shouldDelete={shouldDelete}
                saveTodo={saveTodo}
                removeTodo={removeTodo}
            />

            {
                allTodos &&
                <TodosList
                    todos={allTodos}
                    editTodo={(todo: Todo) => {
                        setEditedTodo(todo);
                        toggleModal();
                    }}
                    deleteTodo={(todo: Todo) => {
                        setEditedTodo(todo);
                        setShouldDelete(true);
                        toggleModal();
                    }}
                    addNewTodo={() => {
                        setEditedTodo(initialTodo);
                        toggleModal();
                    }}
                />
            }
        </div>
    );
}

export default Todos;
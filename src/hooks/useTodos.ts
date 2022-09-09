import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { FetchedTodo, Todo } from 'models/Todo';
import extractIsoDate from 'functions/extractIsoDate';
import getAllTodos from 'axios/http/getAllTodos';
import postTodo from 'axios/http/postTodo';
import patchTodo from 'axios/http/patchTodo';
import deleteTodo from 'axios/http/deleteTodo';

const useTodos = () => {
    const initialTodo: Todo = {
        text: '',
        completed: false,
        createdTime: extractIsoDate(),
        lastUpdated: new Date()
    }

    const [allTodos, setAllTodos] = useState<Todo[]>();
    const [todoQuery, setTodoQuery] = useState<string>(``);
    const [editedTodo, setEditedTodo] = useState<Todo>(initialTodo);
    const [shouldDelete, setShouldDelete] = useState<boolean>(false);
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const {
        data: fetchedTodos,
        isLoading: lodaingTodos,
        refetch: refetchTodos
    } = useQuery<FetchedTodo[]>('todos fetching', () => getAllTodos(todoQuery))

    useEffect(() => {
        setEditedTodo(initialTodo);
        setModal(false);
        setShouldDelete(false);

        if (!lodaingTodos && fetchedTodos) {
            console.log("fetched: ", fetchedTodos);
            
            setAllTodos(fetchedTodos.map((todo: FetchedTodo) => {
                return {...todo,
                    createdTime: extractIsoDate(todo.createdTime),
                    lastUpdated: todo.lastUpdated
                }
            }))
        }
    }, [fetchedTodos])

    useEffect(() => {
        refetchTodos();
    }, [todoQuery])

    const saveTodo = async () => {
        shouldDelete
        ?
        removeTodo()
        :
        editedTodo.id ? updateTodo() : addTodo()
    }

    const updateTodo = async () => {
        const updatedTodo = {...editedTodo, lastUpdated: new Date()};

        patchTodo(updatedTodo).then((response) => {
            alert('Task successfully updated');
            refetchTodos();
        })
        .catch((error) => {
            alert("An error occured");
            console.log("error: ", error.message);
        })
    }

    const addTodo = async () => {
        const addedTodo = {...editedTodo, lastUpdated: new Date()};

        postTodo(addedTodo).then((response) => {
            alert('Task successfully added');
            refetchTodos();
        })
        .catch((error) => {
            alert("An error occured, try again");
            console.log("error: ", error.message);
        })
    }

    const removeTodo = async () => {
        deleteTodo(editedTodo.id!).then((response) => {
            alert('Task successfully removed');
            refetchTodos();
        })
        .catch((error) => {
            alert("An error occured, try again");
            console.log("error: ", error.message);
        })
    }

    return {
        initialTodo,
        allTodos,
        todoQuery,
        setTodoQuery,
        editedTodo,
        setEditedTodo,
        shouldDelete,
        setShouldDelete,
        modal,
        setModal,
        toggleModal,
        saveTodo
    }
}

export default useTodos;
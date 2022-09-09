import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { FetchedTodo, Todo } from 'models/Todo';
import { format } from "date-fns";
import { parseISO } from 'date-fns/esm';
import getAllTodos from 'axios/http/getAllTodos';
import postTodo from 'axios/http/postTodo';
import patchTodo from 'axios/http/patchTodo';
import deleteTodo from 'axios/http/deleteTodo';

const useTodos = () => {
    const initialTodo: Todo = {
        text: '',
        completed: false,
        createdTime: new Date().toISOString()
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
            setAllTodos(fetchedTodos.map((todo: FetchedTodo) => {
                return {...todo, createdTime: todo.createdTime.toString()}
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

        shouldDelete
        ?
        removeTodo()
        :
        editedTodo.id ? updateTodo() : addTodo()
    }

    const updateTodo = async () => {
        patchTodo(editedTodo).then((response) => {
            alert('Task successfully updated');
            refetchTodos();
        })
        .catch((error) => {
            alert("An error occured");
            console.log("error: ", error.message);
        })
    }

    const addTodo = async () => {
        postTodo(editedTodo).then((response) => {
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
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { FetchedTodo, Todo } from 'models/Todo';
import extractIsoDate from 'functions/extractIsoDate';
import getTomorrow from 'functions/getTomorrow';
import isDatesEqual from 'functions/isDatesEqual';
import getAllTodos from 'axios/http/getAllTodos';
import postTodo from 'axios/http/postTodo';
import patchTodo from 'axios/http/patchTodo';
import deleteTodo from 'axios/http/deleteTodo';

const useTodos = () => {
    const initialTodo: Todo = {
        text: '',
        completed: false,
        createdTime: extractIsoDate(false),
        lastUpdated: new Date(),
        deadline: getTomorrow()
    }

    const [allTodos, setAllTodos] = useState<Todo[]>();
    const [allTodosDeadlines, setAllTodosDeadlines] = useState<Date[]>();
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>();
    const [filterDate, setFilterDate] = useState<Date>();
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
            setAllTodos(fetchedTodos
                .map((todo: FetchedTodo) => {
                    return {...todo,
                        createdTime: extractIsoDate(false, todo.createdTime),
                        lastUpdated: new Date(todo.lastUpdated),
                        deadline: new Date(todo.deadline)
                }})
                .sort((t1, t2) => t1.lastUpdated >= t2.lastUpdated ? -1 : 1)
            )
            
            setFilteredTodos(fetchedTodos
                .map((todo: FetchedTodo) => {
                    return {...todo,
                        createdTime: extractIsoDate(false, todo.createdTime),
                        lastUpdated: new Date(todo.lastUpdated),
                        deadline: new Date(todo.deadline)
                }})
                .sort((t1, t2) => t1.lastUpdated >= t2.lastUpdated ? -1 : 1)
            )

            const allDeadlines = [...fetchedTodos.map(todo => {
                const deadline = new Date(todo.deadline);
                deadline.setHours(0, 0, 0, 0);
                return deadline;
            })];
            setAllTodosDeadlines(allDeadlines);
        }
    }, [fetchedTodos])

    useEffect(() => {
        refetchTodos();
    }, [todoQuery])

    useEffect(() => {
        filterByDate();
    }, [filterDate])

    const filterByDate = () => {
        filterDate
        ?
        setFilteredTodos(allTodos?.filter(todo => isDatesEqual(todo.deadline, filterDate!)))
        :
        setFilteredTodos(allTodos)
    }

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
        filteredTodos,
        setFilteredTodos,
        todoQuery,
        setTodoQuery,
        editedTodo,
        setEditedTodo,
        shouldDelete,
        setShouldDelete,
        modal,
        setModal,
        toggleModal,
        saveTodo,
        filterDate,
        setFilterDate,
        allTodosDeadlines
    }
}

export default useTodos;
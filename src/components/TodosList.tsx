import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Todo } from 'models/Todo';
import { TodoDisplay } from 'models/TodoDisplay';
import TodoContainer from 'components/TodoContainer';
import PaginationArrows from 'components/pagination/PaginationArrows';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
 
type Props = {
    todos: Todo[]
    filterDate?: Date
    setFilterDate: (date?: Date) => void
    editTodo: (todo: Todo) => void
    deleteTodo: (todo: Todo) => void
    addNewTodo: () => void
}

const TodosList: React.FC<Props> = ({todos, filterDate, setFilterDate, editTodo, deleteTodo, addNewTodo}) => {   
    const [fromIndex, setFromIndex] = useState(TodoDisplay.firstIndex);

    useEffect(() => {
        setFromIndex(TodoDisplay.firstIndex);
    }, [todos])

    return (
        <div className='d-flex flex-column todos-list'>
            <div className='d-flex flex-column todos-header'>
                <div className='row justify-content-between'>
                    <Button
                        id='newTodo'
                        name='newTodo'
                        className='col-1 btn-success p-0 mt-3 ms-4'
                        onClick={addNewTodo}
                    >
                        +
                    </Button>

                    <Button
                        id='newTodo'
                        name='newTodo'
                        className='col-3 btn-danger p-0 mt-3 me-4'
                        onClick={() => setFilterDate(undefined)}
                        disabled={filterDate === undefined}
                    >
                        Reset Date
                    </Button>
                </div>
                
                <div className='col-12 text-center todos-title'>My Tasks</div>
            </div>

            <div className='d-flex flex-column'>
                <div className='col-12 align-self-center mt-4 todos-content'>
                    {
                        todos
                        .slice(fromIndex, fromIndex + TodoDisplay.maxTodosPerPage)
                        .map((todo: Todo) => (
                            <TodoContainer
                                key={todo.id}
                                todo={todo}
                                editTodo={() => editTodo(todo)}
                                deleteTodo={() => deleteTodo(todo)}
                            />
                        ))
                    }
                </div>
                
                <PaginationArrows
                    moveToNextPage={() => setFromIndex(fromIndex + TodoDisplay.maxTodosPerPage)}
                    moveToPreviousPage={() => setFromIndex(fromIndex - TodoDisplay.maxTodosPerPage)}
                    currentIndex={fromIndex}
                    totalTodos={todos.length}
                />
            </div>
        </div>
    );
}

export default TodosList;
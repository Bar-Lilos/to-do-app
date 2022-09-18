import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Todo } from 'models/Todo';
import { TodoDisplay } from 'models/TodoDisplay';
import TodoContainer from 'components/TodoContainer';
import PaginationArrows from 'components/pagination/PaginationArrows';
import { DragDropContext, Draggable, Droppable, DroppableProps } from 'react-beautiful-dnd';
 
type Props = {
    filteredTodos: Todo[]
    setFilteredTodos: (todos: Todo[]) => void
    filterDate?: Date
    setFilterDate: (date?: Date) => void
    editTodo: (todo: Todo) => void
    deleteTodo: (todo: Todo) => void
    addNewTodo: () => void
}

const TodosList: React.FC<Props> = ({filteredTodos, setFilteredTodos, filterDate, setFilterDate, editTodo, deleteTodo, addNewTodo}) => {   
    const [fromIndex, setFromIndex] = useState(TodoDisplay.firstIndex);

    useEffect(() => {
        setFromIndex(TodoDisplay.firstIndex);
    }, [filteredTodos])

    const handleDrop = (droppedItem: any) => {
        if (!droppedItem.destination) return;

        var updatedList = [...filteredTodos];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setFilteredTodos(updatedList);
    };

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
                    <DragDropContext onDragEnd={handleDrop}>
                        <Droppable droppableId='todo-list'>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        filteredTodos
                                        .slice(fromIndex, fromIndex + TodoDisplay.maxTodosPerPage)
                                        .map((todo: Todo, index: number) => (
                                            <Draggable key={todo.id} draggableId={todo.id!.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                    >
                                                        <TodoContainer
                                                            key={todo.id}
                                                            todo={todo}
                                                            editTodo={() => editTodo(todo)}
                                                            deleteTodo={() => deleteTodo(todo)}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                
                <PaginationArrows
                    moveToNextPage={() => setFromIndex(fromIndex + TodoDisplay.maxTodosPerPage)}
                    moveToPreviousPage={() => setFromIndex(fromIndex - TodoDisplay.maxTodosPerPage)}
                    currentIndex={fromIndex}
                    totalTodos={filteredTodos.length}
                />
            </div>
        </div>
    );
}

export default TodosList;
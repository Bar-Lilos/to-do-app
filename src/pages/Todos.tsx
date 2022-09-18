import React, { useEffect } from 'react';
import { Todo } from 'models/Todo';
import useTodos from 'hooks/useTodos';
import TodosList from 'components/TodosList';
import TodoModal from 'components/modals/TodoModal';
import TodoFilter from 'components/TodoFilter';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import isDatesEqual from 'functions/isDatesEqual';
 
const Todos: React.FC = () => {
    const {
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
        toggleModal,
        saveTodo,
        filterDate,
        setFilterDate,
        allTodosDeadlines
    } = useTodos();
        
    const calendarDayClass = (calendarProps: CalendarTileProperties) => {
        const date = new Date(calendarProps.date);
        date.setHours(0, 0, 0, 0);

        return allTodosDeadlines?.findIndex(deadline => isDatesEqual(date, deadline)) !== -1
        ? 'calendar-day calendar-todos-day'
        : 'calendar-day';
    }

    return (
        <>
            <div className='d-felx flex-column justify-content-center todo-page'>
                <TodoFilter
                    todoQuery={todoQuery}
                    setTodoQuery={setTodoQuery}
                />

                <TodoModal
                    isOpen={modal}
                    toggle={toggleModal}
                    editedTodo={editedTodo}
                    setEditedTodo={setEditedTodo}
                    shouldDelete={shouldDelete}
                    saveTodo={saveTodo}
                />

                {
                    filteredTodos &&
                    <TodosList
                        filteredTodos={filteredTodos}
                        setFilteredTodos={setFilteredTodos}
                        filterDate={filterDate}
                        setFilterDate={setFilterDate}
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

            <Calendar
                calendarType='Hebrew'
                defaultView='month'
                value={filterDate}
                onChange={setFilterDate}
                className='calendar'
                tileClassName={calendarDayClass}
            />
        </>
    );
}

export default Todos;
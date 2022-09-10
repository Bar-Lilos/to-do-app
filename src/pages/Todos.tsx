import React from 'react';
import { Todo } from 'models/Todo';
import useTodos from 'hooks/useTodos';
import TodosList from 'components/TodosList';
import TodoModal from 'components/modals/TodoModal';
import TodoFilter from 'components/TodoFilter';
 
const Todos: React.FC = () => {
    const {
        initialTodo,
        allTodos,
        todoQuery,
        setTodoQuery,
        editedTodo,
        setEditedTodo,
        shouldDelete,
        setShouldDelete,
        modal,
        toggleModal,
        saveTodo
    } = useTodos();
        
    return (
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
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Todo } from 'models/Todo';

import EditTodoModal from 'components/modals/EditTodoModal';
import AddTodoModal from 'components/modals/AddTodoModal';
import DeleteTodoModal from 'components/modals/DeleteTodoModal';
 
type Props = {
    isOpen: boolean
    toggle: () => void
    editedTodo: Todo
    setEditedTodo: (todo: Todo) => void
    shouldDelete: boolean
    saveTodo: () => void
    removeTodo: () => void
}

const TodoModal: React.FC<Props> = ({isOpen, toggle, editedTodo, setEditedTodo, shouldDelete, saveTodo, removeTodo}) => {
    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
        >
            {
                shouldDelete
                ?
                <DeleteTodoModal
                    removeTodo={removeTodo}
                    toggle={toggle}
                />
                :
                <EditTodoModal
                    editedTodo={editedTodo}
                    setEditedTodo={setEditedTodo}
                    saveTodo={saveTodo}
                />
            }
        </Modal>
    );
}

export default TodoModal;
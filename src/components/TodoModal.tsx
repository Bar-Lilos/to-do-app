import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Todo } from 'models/Todo';
 
type Props = {
    isOpen: boolean
    toggle: () => void
    editedTodo: Todo
}

const TodoModal: React.FC<Props> = () => {
    return (
        <>
        
        </>
    );
}

export default TodoModal;
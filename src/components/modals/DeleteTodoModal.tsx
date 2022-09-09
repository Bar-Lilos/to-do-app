import React, { useState, useEffect } from 'react';
import { Button, ModalBody, ModalHeader } from 'reactstrap';
import { useQuery } from 'react-query';
 
type Props = {
    removeTodo: () => void
    toggle: () => void
}

const DeleteTodoModal: React.FC<Props> = ({removeTodo, toggle}) => {
    return (
        <>
            <ModalHeader>Warning</ModalHeader>

            <ModalBody>
                Are you sure you want to delete?

                <div className='d-flex flex-row text-center'>
                    <Button
                        id='removeTodo'
                        name='removeTodo'
                        className='btn-success'
                        onClick={() => removeTodo()}
                    >
                        Yes
                    </Button>

                    <Button
                        id='ignore'
                        name='ignore'
                        className='btn-danger'
                        onClick={toggle}
                    >
                        No
                    </Button>
                </div>                    
            </ModalBody>
        </>
    );
}

export default DeleteTodoModal;
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
                <div className='row justify-content-center mb-3'>
                    Are you sure you want to delete?
                </div>

                <div className='d-flex flex-row justify-content-center'>
                    <Button
                        id='removeTodo'
                        name='removeTodo'
                        className='btn-success me-5'
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
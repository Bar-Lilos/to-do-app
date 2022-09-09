import React, { useState, useEffect } from 'react';
import { Input, Button } from 'reactstrap';
 
type Props = {
    todoQuery: string,
    setTodoQuery: (query: string) => void
}

const TodoFilter: React.FC<Props> = ({todoQuery, setTodoQuery}) => {    
    return (
        <>
            <div className='col-6 d-flex flex-row'>
                <Input
                    id='todoNameFilter'
                    name='todoNameFilter'
                    type='text'
                    className='text me-4'
                    placeholder='Name filter...'
                    value={todoQuery}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setTodoQuery(e.currentTarget.value)}
                />

                <Button
                    id='filterReset'
                    name='filterReset'
                    className='btn-danger'
                    onClick={() => setTodoQuery(``)}
                >
                    Reset
                </Button>
            </div>
        </>
    );
}

export default TodoFilter;
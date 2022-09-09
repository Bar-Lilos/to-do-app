import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { TodoDisplay } from 'models/TodoDisplay';
 
type Props = {
    moveToNextPage: () => void
    moveToPreviousPage: () => void
    currentIndex: number
    finalIndex: number
    totalTodos: number
}

const NavigationArrows: React.FC<Props> = ({moveToNextPage, moveToPreviousPage, currentIndex, finalIndex, totalTodos}) => {       
    return (
        <div className='d-flex flex-row justify-content-center'>
            <Button
                id='newTodo'
                name='newTodo'
                className='btn-success col-2 mb-4 me-5'
                onClick={moveToPreviousPage}
                disabled={currentIndex === TodoDisplay.firstIndex}
            >
                Prev
            </Button>

            <Button
                id='newTodo'
                name='newTodo'
                className='btn-success col-2 mb-4'
                onClick={moveToNextPage}
                disabled={finalIndex === totalTodos}
            >
                Next
            </Button>
        </div>
    );
}

export default NavigationArrows;
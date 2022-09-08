import axiosConfig from '../axiosConfig';

const deleteTodo = (todoId: number) => {
    const response = axiosConfig({
        method: 'delete',
        url: `api/todo/${todoId}`,
    })
    .then((response) => response.data)
    .catch((error) => {throw error});
    
    return response;
}

export default deleteTodo;
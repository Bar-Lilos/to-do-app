import axiosConfig from '../axiosConfig';

const getAllTodos = (query?: string) => {
    const response = axiosConfig({
        method: 'get',
        url: `api/todos?search=${query}`,
        //data: {}
    })
    .then((response) => response.data)
    .catch((error) => {throw error});
    
    return response;
}

export default getAllTodos;
import axiosConfig from '../axiosConfig';

const postTodo = (newTodo: string) => {
    const response = axiosConfig({
        method: 'post',
        url: `api/todo`,
        data: {text: newTodo}
    })
    .then((response) => response.data)
    .catch((error) => {throw error});
    
    return response;
}

export default postTodo;
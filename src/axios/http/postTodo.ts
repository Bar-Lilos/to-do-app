import axiosConfig from '../axiosConfig';
import { Todo } from 'models/Todo';

const postTodo = (newTodo: Todo) => {
    const response = axiosConfig({
        method: 'post',
        url: `api/todo`,
        data: newTodo
    })
    .then((response) => response.data)
    .catch((error) => {throw error});
    
    return response;
}

export default postTodo;
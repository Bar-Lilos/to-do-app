import axiosConfig from '../axiosConfig';
import { Todo } from 'models/Todo';

const patchTodo = (todo: Todo) => {
    const response = axiosConfig({
        method: 'patch',
        url: `api/todo`,
        data: todo
    })
    .then((response) => response.data)
    .catch((error) => {throw error});
    
    return response;
}

export default patchTodo;
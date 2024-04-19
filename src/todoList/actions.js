export const addGroup = (from, to, id) => ({
    type: 'ADD_GROUP',
    payload: {from, to},
    id
});

export const deleteGroup = (id) => ({
    type: 'DELETE_GROUP',
    id
});

export const setCompletionStatus = (status) => ({
    type: 'SET_COMPLETION_STATUS',
    status
});

export const fetchTodoData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
            const data = await response.json();
            dispatch(setCompletionStatus(data));
        } catch (error) {
            console.error('Error fetching completion status:', error);
        }
    };
};

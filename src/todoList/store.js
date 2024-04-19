import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

const initialState = {
    groups: [{ id: 1, from: 1, to: 2 }],
    completionStatus: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_GROUP':
            const newGroup = { id: state.groups.length + 1, from: action.payload.from, to: action.payload.to };
            return {
                ...state,
                groups: [...state.groups, newGroup]
            };
        case 'DELETE_GROUP':
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.id)
            };
        case 'SET_COMPLETION_STATUS':
            return {
                ...state,
                completionStatus: action.status
            };
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
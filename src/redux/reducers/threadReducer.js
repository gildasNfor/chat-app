import { ActionTypes } from "../actions/threadActions";

const INITIAL_STATE = {
    allThreads: [],
    currentThread: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SET_ALL_THREADS:
            return { ...state, allThreads: action.allThreads };
        case ActionTypes.SET_CURRENT_THREAD:
            return { ...state, currentThread: action.thread };
        case ActionTypes.ADD_NEW_THREAD:
            let _allThreads = [...state.allThreads, action.thread]
            return { ...state, allThreads: _allThreads };
        default:
            return state;
    }
};
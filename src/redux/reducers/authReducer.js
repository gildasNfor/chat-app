import { ActionTypes } from "../actions/authActions";

const INITIAL_STATE = {
    user: null,
    allUsers: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            const user = action.user;
            return { ...state, user };
        case ActionTypes.SET_ALL_USERS:
            return { ...state, allUsers: action.allUsers };
        default:
            return state;
    }

};
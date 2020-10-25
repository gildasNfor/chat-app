const INITIAL_STATE = {
    user: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            const user = action.user;
            return { ...state, user };
        default:
            return state;
    }
};
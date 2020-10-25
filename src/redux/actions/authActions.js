export const ActionTypes = {
    SET_ALL_USERS: 'SET_ALL_USERS',
    SET_USER: 'SET_USER'
}
export const setUser = (user) => {
    return {
        type: ActionTypes.SET_USER,
        user: user,
    }
}
export const setAllUsers = (allUsers) => {
    return {
        type: ActionTypes.SET_ALL_USERS,
        allUsers: allUsers
    }
}
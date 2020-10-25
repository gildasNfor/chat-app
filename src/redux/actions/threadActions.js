export const ActionTypes = {
    SET_ALL_THREADS: 'SET_ALL_THREADS',
    ADD_NEW_THREAD: 'ADD_NEW_THREAD',
    SET_CURRENT_THREAD: 'SET_CURRENT_THREAD'
}
export const setAllThreads = (threads) => {
    return {
        type: ActionTypes.SET_ALL_THREADS,
        allThreads: threads,
    }
}
export const setCurrentThread = (thread) => {
    return {
        type: ActionTypes.SET_CURRENT_THREAD,
        thread: thread,
    }
}
export const addNewThread = (thread) => {
    return {
        type: ActionTypes.ADD_NEW_THREAD,
        thread: thread,
    }
}
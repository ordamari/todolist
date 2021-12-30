
const initialState = {
    todoList: null,
}

export function todoListReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TODOLIST':
            return {
                ...state,
                todoList: action.todoList
            }
        default:
            return state
    }
}
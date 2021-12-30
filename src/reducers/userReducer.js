const initialState = {
    users: [],
    loggedInUser: JSON.parse(sessionStorage.getItem('loggedInUser'))?JSON.parse(sessionStorage.getItem('loggedInUser')):null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOGIN_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}
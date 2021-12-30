import { userService } from '../services/userService'


export function onSetUsers() {
  return async dispatch => {
    const users = await userService.getUsers();
    dispatch({ type: 'SET_USERS', users });
  }
}

export function onLogin(credential) {
  return async dispatch => {
    const user = await userService.login(credential);
    if (!user) return false;
    else {
      dispatch({ type: 'SET_LOGIN_USER', user });
      return user
    }
  }
}

export function onLogout() {
  return dispatch => {
    userService.logout();
    dispatch({ type: 'SET_LOGIN_USER', user:null});
  }
}

export function onSignup(newUser) {
  return async dispatch => {
    const user = await userService.signup(newUser);
    dispatch({ type: 'SET_LOGIN_USER', user });
    return user
  }
}





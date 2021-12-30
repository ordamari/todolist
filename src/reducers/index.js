import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { todoListReducer } from './todoListReducer';

const rootReducer = combineReducers({
  user: userReducer,
  todoList:todoListReducer
  
})

export default rootReducer;
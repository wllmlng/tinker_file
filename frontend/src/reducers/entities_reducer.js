import { combineReducers } from 'redux'; 
import userReducer from "./user_reducer"; 
import ListsReducer from "./lists_reducer"; 
import TasksReducer from "./tasks_reducer"; 


export default combineReducers ({
    currentUser: userReducer,
    lists: ListsReducer,
    tasks: TasksReducer,
});
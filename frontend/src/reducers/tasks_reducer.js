import { RECEIVE_TASKS, RECEIVE_TASK, REMOVE_TASK, RECEIVE_COMMENT,CLEAR_COMMENTS } from "../actions/task_actions";



const TasksReducer = (state={}, action) =>  {
    Object.freeze(state); 
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TASKS:
            return action.tasks;
        case RECEIVE_TASK:
            // newState['hello'] = action.list
            return action.task
            // return newState
        case RECEIVE_COMMENT:
            // newState['hello'] = action.list
            return action.comment
            // return newState
        case REMOVE_TASK: 
            let taskId = action.task._id
            delete newState[taskId]
            return newState
        case CLEAR_COMMENTS:
            return [];        
        default:
            return state;
    }
}

export default TasksReducer; 
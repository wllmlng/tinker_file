import * as TasksAPIUtil from "../util/tasks_api_util"

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
// export const RECEIVE_TASK_ERRORS = "RECEIVE_TASK_ERRORS"
// export const REMOVE_TASK_ERRORS = "REMOVE_TASK_ERRORS";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';


//action 
//! once thunk action returns with results, actions sends to store

const receiveTasks = (tasks) => {
    return {
        type: RECEIVE_TASKS,
        tasks
    }
}

const receiveTask = (task) => {
    return {
        type: RECEIVE_TASK,
        task
    }
}

const removeTask = (task) => {
    return {
        type: REMOVE_TASK,
        task
    }
}




const receiveComment = (comment) => {
    return {
        type: RECEIVE_COMMENT,
        comment
    }
}

const removeComment = (comment) => {
    return {
        type: REMOVE_COMMENT,
        comment
    }
}


export const clearComments = () => {
    return {
        type: CLEAR_COMMENTS,
    }
}

//thunk actions

export const fetchTask = (taskId) => (dispatch) => {
    return TasksAPIUtil.fetchTask(taskId)
        .then(res =>  dispatch(receiveTask(res.data)))
        // .catch(err => (dispatch(receiveQuestionErrors(err))))
}

export const fetchTasks = () => dispatch => {
    return TasksAPIUtil.fetchTasks()
        .then(res => dispatch(receiveTasks(res.data)))
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const postTask = (newTask) => dispatch => {
    return TasksAPIUtil.postTask(newTask)
        .then(res => dispatch(receiveTask(res.data)))
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const updateTask = (taskId, taskUpdates) => dispatch =>{
    return TasksAPIUtil.updateTask(taskId, taskUpdates)
        .then( res => { dispatch(receiveTask(res.data))})
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const deleteTask = (taskId) => dispatch => {
    return TasksAPIUtil.deleteTask(taskId)
        .then( res => { dispatch(removeTask(res.data)) })
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}






//COMMENT THUNK ACTION
export const postComment = (taskId, newComment) => dispatch => {
    return TasksAPIUtil.postComment(taskId, newComment)
        .then(res => dispatch(receiveComment(res.data)))
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const updateComment = (taskId, commentId, commentUpdates) => dispatch =>{
    return TasksAPIUtil.updateComment(taskId, commentId, commentUpdates)
        .then( res => { dispatch(receiveComment(res.data))})
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const deleteComment = (taskId, commentId) => dispatch => {
    return TasksAPIUtil.deleteComment(taskId, commentId)
        .then( res => { dispatch(removeComment(res.data)) })
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}
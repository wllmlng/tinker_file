import axios from "axios";

//TASKS
export const fetchTasks = () => {
    return axios.get("/api/lists")
};

export const fetchTask = (taskId) => {
    return axios.get(`/api/tasks/${taskId}`)
}

export const postTask = (newTask) => {
    return axios.post("/api/tasks", newTask)
}

export const updateTask = (taskId, taskUpdates) => {
    return axios.patch(`/api/tasks/${taskId}`, taskUpdates)
}

export const deleteTask = (taskId) => {
    return axios.delete(`/api/tasks/${taskId}`)
}

//COMMENTS
export const postComment = (taskId, newComment) => {
    return axios.post(`/api/tasks/${taskId}/comments`, newComment)
}

export const updateComment = (taskId, commentId, commentUpdates) => {
    return axios.patch(`/api/tasks/${taskId}/comments/${commentId}`, commentUpdates)
}

export const deleteComment = (taskId, commentId) => {
    return axios.delete(`/api/tasks/${taskId}/comments/${commentId}`)
}
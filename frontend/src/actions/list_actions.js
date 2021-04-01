import * as ListsAPIUtil from "../util/lists_api_util"

export const RECEIVE_LISTS = "RECEIVE_LISTS";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const REMOVE_LIST = "REMOVE_LIST";
// export const RECEIVE_LIST_ERRORS = "RECEIVE_LIST_ERRORS"
// export const REMOVE_LIST_ERRORS = "REMOVE_LIST_ERRORS";
export const CLEAR_LISTS = 'CLEAR_LISTS';


//action 
//! once thunk action returns with results, actions sends to store

const receiveLists = (lists) => {
    return {
        type: RECEIVE_LISTS,
        lists
    }
}

const receiveList = (list) => {
    return {
        type: RECEIVE_LIST,
        list
    }
}

const removeList = (list) => {
    return {
        type: REMOVE_LIST,
        list
    }
}

export const clearLists = () => {
    return {
        type: CLEAR_LISTS,
    }
}

// const receiveListErrors = (errors) => {
//     return{
//         type: RECEIVE_LIST_ERRORS,
//         errors
//     }
// }

// export const removeListErrors = () => {
//     return{
//         type: REMOVE_LIST_ERRORS,
//     }
// }

//thunk actions

export const fetchList = (userId) => (dispatch) => {
    return ListsAPIUtil.fetchList(userId)
        .then(res =>  dispatch(receiveList(res.data)))
        // .catch(err => (dispatch(receiveQuestionErrors(err))))
}

export const fetchLists = () => dispatch => {
    return ListsAPIUtil.fetchLists()
        .then(res => dispatch(receiveLists(res.data)))
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const postList = (newList) => dispatch => {
    return ListsAPIUtil.postList(newList)
        .then(res => dispatch(receiveList(res.data)))
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const updateList = (listId, listUpdates) => dispatch =>{
    return ListsAPIUtil.updateList(listId, listUpdates)
        .then( res => { dispatch(receiveList(res.data))})
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}

export const deleteList = (listId) => dispatch => {
    return ListsAPIUtil.deleteList(listId)
        .then( res => { dispatch(removeList(res.data)) })
        // .catch(err => dispatch(receiveListErrors(err.response.data)))
}
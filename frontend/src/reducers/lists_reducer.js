import { RECEIVE_LISTS, RECEIVE_LIST, REMOVE_LIST, CLEAR_LISTS } from "../actions/list_actions";



const ListsReducer = (state={}, action) =>  {
    Object.freeze(state); 
    let newState = Object.assign({}, state);

    switch (action.type) {
        // case RECEIVE_LISTS:
        //     let send = Object.values(state);
        //     send.push(action.lists)
        //     return send;


        case RECEIVE_LIST:
            // newState['hello'] = action.list
            let send = Object.values(state);
            console.log(send)
            console.log(action.list)
            send.push(action.list)
            // return send;
            return action.list
            // return newState
        case REMOVE_LIST: 
            let res = [];
            let listId = action.list._id
            let arrList = Object.values(newState);

            for(let i = 0; i < arrList.length; i ++){
                if ( arrList[i]._id !== listId ){
                    res.push(arrList[i])
                }
            }
            return res;
        case CLEAR_LISTS:
            return [];    
        default:
            return state;
    }
}

export default ListsReducer; 



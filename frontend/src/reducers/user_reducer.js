import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';
// import { RECEIVE_USER_SIGN_IN } from '../actions/session_actions';

const userReducer = (state = {}, action) => {
    Object.freeze(state);

    // const newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser 
        // case RECEIVE_USER_SIGN_IN: 
        //     return action.currentUser
        case RECEIVE_USER_LOGOUT: 
            return {}; 
        default:
            return state;
    }

}

export default userReducer; 
import * as APIutil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN'; 
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT'; 
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'; 
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'; 
export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserSignIn = (currentUser) => ({ 
    type: RECEIVE_USER_SIGN_IN,
    currentUser
});

export const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const removeErrors = () => {
    return {
        type: REMOVE_SESSION_ERRORS,
    }
}

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});





export const login = (user) => dispatch => {
    return APIutil.login(user).then((res) => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            APIutil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        }).catch(err => {
            dispatch(receiveErrors(err.response.data));
        })
}

export const signup = user => dispatch => (  
    APIutil.signup(user).then( (res) => {
        
        const { token } = res.data; 
        localStorage.setItem('jwtToken', token); 
        APIutil.setAuthToken(token); 
        const decoded = jwt_decode(token);
        dispatch(receiveUserSignIn(decoded))

    }, err => (
        dispatch(receiveErrors(err.response.data))
    ))
);


export const logout = () => dispatch => {
    
    localStorage.removeItem('jwtToken')
 
    APIutil.setAuthToken(false) 

    dispatch(logoutUser()); 
}
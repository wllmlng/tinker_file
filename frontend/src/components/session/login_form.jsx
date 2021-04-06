import React, {useState, useContext, useReducer} from 'react';
import {login} from '../../util/session_api_util';
import {setAuthToken} from '../../util/session_api_util';
import jwt_decode from 'jwt-decode';
import sessionReducer from '../../reducers/session_reducer';
// import {SessionContext} from '../../context/session-context';

const initialState = { isAuthenticated: false, user: {} };

const LoginForm = () => {
   
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');

    //!not sure if context is needed
    const [state, dispatch] = useReducer(sessionReducer, initialState);
    // const [state, dispatch] = useContext(SessionContext);
    //!not sure if context is needed


    const handleSubmit = (e) => {
        e.preventDefault();

        let userData = {
            username: input,
            password: password
        };


        login(userData).then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch({
                type: "RECEIVE_CURRENT_USER",
                currentUser: decoded
            })
            // console.log('res',res)
            // console.log('state',state)
        })
        // .catch(err => {
            //     dispatch(receiveErrors(err.response.data));
        // })
        

    }

    const test = () =>{
        console.log('STATE',state)
    }

    return(
        <div>
            Loinform
            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
                </label>
                <label>Password:
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <button type='submit'>Login</button>
            </form>
            <button type='submit' onClick={test}>test button</button>
        </div>
    )

}

export default LoginForm;
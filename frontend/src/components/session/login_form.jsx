import React, {useState, useContext} from 'react';
import {login} from '../../util/session_api_util';
import {setAuthToken} from '../../util/session_api_util';
import {SessionContext} from './session-context';
import jwt_decode from 'jwt-decode';
import { store } from '../store.js';

const LoginForm = () => {
   
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [state, dispatch] = useContext(SessionContext);

    //! const globalState = useContext(store).state;

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
            //! console.log(decoded)
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
        // console.log(globalState)
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
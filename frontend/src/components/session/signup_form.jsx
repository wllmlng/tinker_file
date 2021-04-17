import React, {useState, useEffect, useContext, useReducer} from 'react';
import {signup} from '../../util/session_api_util';
import { Link } from 'react-router-dom';
import {MainContext} from '../../context/main-context';
import jwt_decode from 'jwt-decode';
import sessionReducer from '../../reducers/session_reducer';
import {setAuthToken} from '../../util/session_api_util';

const SignupForm = () => {

    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const {jwt, setJwt} = useContext(MainContext);

    const [state, dispatch] = useReducer(sessionReducer, jwt);

    const handleSubmit = (e) => {
        e.preventDefault();

        let userData = {
            username: input,
            password: password
        };


        signup(userData).then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch({
                type: "RECEIVE_CURRENT_USER",
                currentUser: decoded
            })
        })
        // .catch(err => {
        //         dispatch(receiveErrors(err.response.data));
        // })
    }
    
    useEffect(() => {
        setJwt(state)
    },[state])
    
    return(
        <div>
            Signup
            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
                </label>
                <label>Password:
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <button type='submit'>Sign Up</button>
            </form>
            <Link to='/login'>Login</Link>
        </div>
    )

}

export default SignupForm;
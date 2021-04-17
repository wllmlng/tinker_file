import React, {useState, useEffect, useContext, useReducer} from 'react';
import {login} from '../../util/session_api_util';
import {setAuthToken} from '../../util/session_api_util';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import sessionReducer from '../../reducers/session_reducer';
// import {SessionContext} from '../../context/session-context';
import {MainContext} from '../../context/main-context';


const LoginForm = () => {
   
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


        login(userData).then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch({
                type: "RECEIVE_CURRENT_USER",
                currentUser: decoded
            })
        }).catch(err => {
                // dispatch(receiveErrors(err.response.data));
                // console.log('look', err.response.data)
        })
    }

    //update dates jwt authentication on sessionReducer state change
    useEffect(() => {
        setJwt(state)
    },[state])

    const test = () =>{
        console.log('reducerState',state)
    }

    return(
        <div>
            Loginform
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
            <Link to='/signup'>Sign Up</Link>
        </div>
    )

}

export default LoginForm;
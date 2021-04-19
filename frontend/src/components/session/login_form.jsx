import React, {useState, useEffect, useContext, useReducer} from 'react';
import {login} from '../../util/session_api_util';
import {setAuthToken} from '../../util/session_api_util';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import sessionReducer from '../../reducers/session_reducer';
import sessionErrorsReducer from '../../reducers/session_errors_reducer';
// import {SessionContext} from '../../context/session-context';
import {MainContext} from '../../context/main-context';


import axios from 'axios';

const LoginForm = () => {
   
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const {jwt, setJwt} = useContext(MainContext);


    const [state, dispatch] = useReducer(sessionReducer, jwt);
    const [sessError, dispatchErr] = useReducer(sessionErrorsReducer, []);

    const postSlack = () => {
        //token
        const slackToken = 'xoxb-1980593975044-1974431144242-Fiu0SmyF1asXXAWEptk4aZ3X'
        const url = 'https://hooks.slack.com/services/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'
        let text = {
            text: "Hello world"
        }
        // const res =  axios.post(url, JSON.stringify({
        //     'text':'Hello'
        // // }, {headers: {authorization: `Bearer ${slackToken}`}});
        // // }, {headers: {'Content-Type': "application/json"}});
        // }), {headers: {'Content-Type': "application/x-www-form-urlencoded"}});



        //!last worked
        axios({
            method: "POST",
            url: url,
            headers: { 
                "Content-type": "application/x-www-form-urlencoded"
            },
            data: { text: "Sometimes?!" },
            }).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            });
        //!last worked
   
    };


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
            dispatchErr({
                type: "RECEIVE_SESSION_ERRORS",
                errors: err.response.data
            })
        })
    }

    //update dates jwt authentication on sessionReducer state change
    useEffect(() => {
        setJwt(state)
    },[state])

    const test = () =>{
        console.log('reducerState',state)
        console.log('errors',sessError)
    }
    
    return(
        <div>
            Loginform
            {console.log('RENDER FROM LOGIN FORM')}
            {sessError.map((err) => (
                <div key={err}>{err}</div>
            ))}
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
            <button type='submit' onClick={postSlack}>postSlack</button>
            <Link to='/signup'>Sign Up</Link>
        </div>
    )

}

export default LoginForm;
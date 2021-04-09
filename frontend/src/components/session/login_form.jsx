import React, {useState, useEffect, useContext, useReducer} from 'react';
import {login} from '../../util/session_api_util';
import {setAuthToken} from '../../util/session_api_util';
import jwt_decode from 'jwt-decode';
import sessionReducer from '../../reducers/session_reducer';
// import {SessionContext} from '../../context/session-context';
import {MainContext} from '../../context/main-context';


// const initialState = { isAuthenticated: false, user: {} };

const LoginForm = () => {
   
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const {jwt, setJwt} = useContext(MainContext);

    //!not sure if context is needed
    const [state, dispatch] = useReducer(sessionReducer, jwt);
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

    //update dates jwt authentication on sessionReducer state change
    useEffect(() => {
        setJwt(state)
    },[state])

    const test = () =>{
        console.log('reducerState',state)
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
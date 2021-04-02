import React, {useState} from 'react';
import {login} from '../../util/session_api_util';

const LoginForm = () => {
   
    const [input, setInput] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = {
            username: input,
            password: password
        }
        login(userData)
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
        </div>
    )

}

export default LoginForm;
import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/login.scss';
import { useDispatch } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { Link } from 'react-router-dom';

const SignupForm = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();


    // useEffect(() => {
    //     props.removeErrors();
    // },[])

    function sendMessage(e){
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };

        dispatch(signup(user))
    }

    return (
        <div className='userAuth'>
            
            <div className='login_form_container'>

                <div className='left_login'>
                    <h2 className='login_logo'>Trustero</h2>
                    <h2 className='sub_title'>Register</h2>
                    <p>Sign up with a username.</p>
                    
                    <form onSubmit={sendMessage} className='login_form_box'>


                        <label className='email_login'>Username
                                <input className='login_input' type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className='name_input_area'
                                />
                        </label>

                        <label className='password_login'>Password
                                <input className='login_input' type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='name_input_area'
                                />
                        </label>

                        {/* {props.errors.map((err,i) => {
                            return (
                                <div key={i} className='error_message'>
                                    {err}
                                </div>
                            )
                        })} */}

                        <button type="submit" value="Sign Up" className='signin-Button'>Sign Up</button>
                        <div>
                            <Link to={`/login` } ><button className='session_change'>Back</button></Link>
                        </div>
                    </form>
                    <div className='error_message'>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default withRouter(SignupForm);
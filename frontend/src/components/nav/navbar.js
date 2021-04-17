import React, {useReducer, useContext, useEffect} from "react";
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/navbar.scss';
import sessionReducer from '../../reducers/session_reducer';
import {MainContext} from '../../context/main-context';
import { setAuthToken } from "../../util/session_api_util";


const NavBar = (props) => {

    const [state, dispatch] = useReducer(sessionReducer);
    const {jwt, setJwt} = useContext(MainContext);

    //update dates jwt authentication on sessionReducer state change
    useEffect(() => {
        if ( state !== undefined ){
            setJwt(state)
        }
    },[state])

    function logoutUser() {
        localStorage.removeItem('jwtToken')
        setAuthToken(false) 
        dispatch({
            type: "RECEIVE_USER_LOGOUT"
        })
    }


    function getLinks() {
        if (jwt.isAuthenticated) {
            return (
                <div className='lefty'>
                    <button onClick={() => logoutUser()} className='logoutButton'>Logout</button>
                </div>
            );
        } else {
            return (
                <div className='right-navbar'>
                    <Link to={'/login'} className='signinButton'>Sign in</Link>
                </div>
            );
        }
    }

    return (
        <div className='navbar-container'>
            {console.log('RENDER FROM NAV BAR')}
            <div className='nav-header-bar'>
                <div className='left-navbar'>    
                    <div className='brand-navbar'>Tinker</div>
                </div>
                <div>
                    {getLinks()}
                </div>
            </div>
        </div>
        

    )


}

export default NavBar;
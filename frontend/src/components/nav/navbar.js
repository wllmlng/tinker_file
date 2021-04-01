import React from "react";
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions';


const NavBar = (props) => {

    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.session.isAuthenticated)

    function logoutUser() {
        dispatch(logout());

    }


    function getLinks() {
        if (loggedIn) {
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
            <div className='nav-header-bar'>
                <div className='left-navbar'>    
                    <div className='brand-navbar'>Trustero</div>
                </div>
                <div>
                    {getLinks()}
                </div>
            </div>
        </div>
        

    )


}

export default NavBar;
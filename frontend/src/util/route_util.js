import React, {useContext, useEffect} from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import {MainContext} from '../context/main-context';


export const AuthRoute = ({ children }) => {
    
    const {jwt} = useContext(MainContext);
    const history = useHistory();

    useEffect(()=>{
        if(!jwt.isAuthenticated){
            history.push('/login')
        }

    },[jwt])

    return(
        <div>
            {!jwt.isAuthenticated ? (
                <div>
                    {children}
                </div>
            ) : (
                    // Redirect to the bulletin page if the user is authenticated
                    <Redirect to="/" />
                )
            }
        </div>
    )
};

export const ProtectedRoute = ({ component: Component, path, exact }) => {
    
    const {jwt} = useContext(MainContext);
    
    return (
        <Route
            path={path} exact = {exact}
            render={props =>
                jwt.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        // Redirect to the login page if the user is already authenticated
                        <Redirect to="/login" />
                    )
            }
        />

    )
};

import React, {useContext, useEffect} from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import {MainContext} from '../context/main-context';


// Passed in from parent component or from mapStateToProps
export const AuthRoute = ({ children }) => {
    
    const {jwt} = useContext(MainContext);
    const history = useHistory();

    useEffect(()=>{
        if(!jwt.isAuthenticated){
            history.push('/login')
        }
        console.log('triggered route util')
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



// const mapStateToProps = state => (
//     { loggedIn: state.session.isAuthenticated }
// );
// export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
// export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
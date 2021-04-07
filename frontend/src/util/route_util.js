import React, {useContext} from 'react';
// import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {MainContext} from '../context/main-context';

// Passed in from parent component or from mapStateToProps
export const AuthRoute = ({ component: Component, path, loggedIn, exact }) => {
    
    const {jwt} = useContext(MainContext);

    return(
        <Route path={path} exact={exact} render={(props) => (
            // !loggedIn ? (
            jwt.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    // Redirect to the bulletin page if the user is authenticated
                    <Redirect to="/" />
                )
        )} />

    )
};

export const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
    
    const {jwt} = useContext(MainContext);
    
    return (
        <Route
            {...rest}
            render={props =>
                // loggedIn ? (
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
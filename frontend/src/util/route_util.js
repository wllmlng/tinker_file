import React, {useReducer, useEffect} from 'react';
// import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import sessionReducer from '../reducers/session_reducer';

// Passed in from parent component or from mapStateToProps
export const AuthRoute = ({ component: Component, path, loggedIn, exact }) => {
    
    const [state, dispatch] = useReducer(sessionReducer);

    useEffect(() => {
        dispatch({
            type: "RECEIVE_CURRENT_USER",
        })
        console.log('state in util', state)

    },[])

    return(
        <Route path={path} exact={exact} render={(props) => (
            !loggedIn ? (
                <Component {...props} />
            ) : (
                    // Redirect to the bulletin page if the user is authenticated
                    <Redirect to="/" />
                )
        )} />

    )
};

export const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                    // Redirect to the login page if the user is already authenticated
                    <Redirect to="/login" />
                )
        }
    />
);



// const mapStateToProps = state => (
//     { loggedIn: state.session.isAuthenticated }
// );
// export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
// export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
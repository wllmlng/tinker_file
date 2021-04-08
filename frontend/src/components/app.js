import React, {lazy, Suspense } from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './session/login_form';
import SignupForm from './session/signup_form';
import List from './list/list';
import '../assets/stylesheets/reset.css';
// import SessionContextProvider from "../context/session-context";


// const List = lazy(() => import('./list/list'));
// const LoginForm = lazy(() => import('./session/login_form'));
// const SignupForm = lazy(() => import('./session/signup_form'));

const App = () => (
  <div>
    <Switch>
        {/* <SessionContextProvider> */}
          {/* <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/" component={List} /> */}
        {/* </SessionContextProvider> */}
      {/* <Suspense fallback={<div>Loading Page...</div>}> */}
      <Route exact path='/login'>
        <AuthRoute>
            <LoginForm />
        </AuthRoute>
      </Route>
        {/* <AuthRoute exact path="/login" component={LoginForm} /> */}
        {/* <AuthRoute exact path="/signup" component={SignupForm} /> */}
        <ProtectedRoute exact path="/" component={List} />
      {/* </Suspense> */}
    </Switch>
  </div>
);

export default App;
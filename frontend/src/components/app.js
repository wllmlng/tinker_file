import React, {lazy, Suspense } from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBar from './nav/navbar';
import '../assets/stylesheets/reset.css';


const List = lazy(() => import('./list/list'));
const LoginForm = lazy(() => import('./session/login_form'));
const SignupForm = lazy(() => import('./session/signup_form'));

const App = () => (
  <div>
    <Switch>
      <Suspense fallback={<div>Loading Page...</div>}>
        <Route exact path='/signup'>
          <AuthRoute><SignupForm /></AuthRoute>
        </Route>
        <Route exact path='/login'>
          <AuthRoute><LoginForm /></AuthRoute>
        </Route>
        <Route exact path ='/'>
          <ProtectedRoute>
            <NavBar />
            <List />
          </ProtectedRoute>
          {/* <ProtectedRoute><List /></ProtectedRoute> */}
        </Route>
      </Suspense>
    </Switch>
  </div>
);

export default App;
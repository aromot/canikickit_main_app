import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Router from '../../lib/Router';
import MessageGlobal from '../../components/MessageGlobal/MessageGlobal';

const 
  Homepage = React.lazy(() => import(/* webpackChunkName: "Homepage" */ './Homepage')),
  Register = React.lazy(() => import(/* webpackChunkName: "Register" */ './Users/Register/Register')),
  Login = React.lazy(() => import(/* webpackChunkName: "Login" */ './Users/Login/Login')),
  UserEdit = React.lazy(() => import(/* webpackChunkName: "UserEdit" */ './Users/Edit/UserEdit')),
  ForgotPassword = React.lazy(() => import(/* webpackChunkName: "ForgotPassword" */ './Users/ForgotPassword/ForgotPassword')),
  ResetPassword = React.lazy(() => import(/* webpackChunkName: "ResetPassword" */ './Users/ResetPassword/ResetPassword'))
;

const routes = [
  {
    path: Router.getRoute('main.homepage'),
    exact: true,
    component: () => <Homepage />
  },
  {
    path: Router.getRoute('main.userRegister'),
    component: () => <Register />
  },
  {
    path: Router.getRoute('main.userLogin'),
    component: () => <Login />
  },
  {
    path: Router.getRoute('main.userEdit'),
    component: () => <UserEdit />
  },
  {
    path: Router.getRoute('main.userForgotPassword'),
    component: () => <ForgotPassword />
  },
  {
    path: Router.getRoute('main.userResetPassword'),
    component: () => <ResetPassword />
  }
];

const Main = () => {

  return (
    <Switch>
      {routes.map((route, i) => {
        return (
          <Route key={'route_'+i} path={route.path} exact={('exact' in route) || false}>
            <MessageGlobal />
            <route.component />
          </Route>
        )
      })}
    </Switch>
  );
}
 
export default Main;
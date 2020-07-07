import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Router from '../../lib/Router';
import MessageGlobal from '../../components/MessageGlobal/MessageGlobal';

const 
  AdminHome = React.lazy(() => import(/* webpackChunkName: "admin_Home" */ './AdminHome'))
;

const routes = [
  {
    path: Router.getRoute('admin.home'),
    exact: true,
    component: () => <AdminHome />
  }
];

const Admin = () => {
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
 
export default Admin;
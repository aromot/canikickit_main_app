import React, { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import Backend from '../../lib/Backend';
import Axios from 'axios';
import { Global } from '@emotion/core';
import globalStyle from './global-style';
import style from './style';
import "normalize.css";
import MessageGlobal from '../MessageGlobal/MessageGlobal';
import NavbarTop from '../NavbarTop/NavbarTop';
import Loader from '../Loader/Loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from '../../domains/Users/Context/UserContext';
import UserEdit from '../../domains/Users/Edit/UserEdit';

const Homepage = React.lazy(() => import(/* webpackChunkName: "Homepage" */ '../../domains/Homepage')),
  Register = React.lazy(() => import(/* webpackChunkName: "Register" */ '../../domains/Users/Register/Register')),
  Login = React.lazy(() => import(/* webpackChunkName: "Login" */ '../../domains/Users/Login/Login'));

const App = () => {

  const [status, setStatus] = useState('init');
  const [user, setUser] = useState(null);

  const initUser = useCallback((iUser) => {
    setUser(iUser)
  }, [user]);

  async function init() {

    setStatus('loading');

    try {
      const url = Backend.getInitData().initRoute;
      const response = await Axios.get(url);
      console.log(response.data);
      Backend.setRoutes(response.data.routes);

      initUser(response.data.user);

      setStatus('success');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  useEffect(() => {
    init();
  }, []);

  const userCtxState = useMemo(() => {
    return {user, initUser}
  }, [user, initUser]);

  const routes = [
    {
      path: '/',
      exact: true,
      component: () => <Homepage />
    },
    {
      path: '/register',
      component: () => <Register />
    },
    {
      path: '/login',
      component: () => <Login />
    },
    {
      path: '/users/edit',
      component: () => <UserEdit />
    }
  ];

  if(status !== 'success')
    return <Loader />;

  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <UserContext.Provider value={userCtxState}>
          <NavbarTop />
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map((route, i) => {
                return (
                  <Route key={'route_'+i} path={route.path} exact={('exact' in route) || false}>
                    <div className={style}>
                      <MessageGlobal />
                      <route.component />
                    </div>
                  </Route>
                )
              })}
            </Switch>
          </Suspense>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
 
export default App;
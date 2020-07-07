import React, { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import Backend from '../lib/Backend';
import Axios from 'axios';
import { Global } from '@emotion/core';
import globalStyle from './global-style';
import style from './style';
import "normalize.css";
// import MessageGlobal from '../components/MessageGlobal/MessageGlobal';
import NavbarTop from '../components/NavbarTop/NavbarTop';
import Loader from '../components/Loader/Loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from '../Main/components/Users/Context/UserContext';

// Routes
import Main from '../Main/components/Main';
import Admin from '../Admin/components/Admin';
import Router from '../lib/Router';

const routes = [
  {
    path: '/' + Router.getPrefix('admin'),
    component: () => <Admin />
  },
  {
    path: '/' + Router.getPrefix('main'),
    component: () => <Main />
  }
];

console.log('routes:', routes);

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
                      {/* <MessageGlobal /> */}
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
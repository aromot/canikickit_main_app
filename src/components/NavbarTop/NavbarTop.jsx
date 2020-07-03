import React, { useContext } from 'react';
import style from './style';
import Backend from '../../lib/Backend';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../domains/Users/Context/UserContext';
import Axios from 'axios';
import Router from '../../lib/Router';

const MenuDefault = () => {
  return (
    <ul className="menu">
      <li>
        <Link to={Router.getRoute('userRegister')}>register</Link>
      </li>
      <li>
        <Link to={Router.getRoute('userLogin')}>login</Link>
      </li>
      <li>
        <Link to={Router.getRoute('userForgotPassword')}>forgot password?</Link>
      </li>
    </ul>
  );
};

const MenuAuth = ({user}) => {

  const history = useHistory();
  const userCtx = useContext(UserContext);

  async function logout() {
    try {
      Axios.get(Backend.getRoute('users.logout'));
      userCtx.initUser(null);
      history.push(Router.getRoute('homepage'), {hasLogout: true});
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = e => {
    e.preventDefault();
    logout();
  }

  return (
    <ul className="menu">
      <li>
        connected as {user.username}
      </li>
      <li>
        <Link to={Router.getRoute('userEdit')}>edit</Link>
      </li>
      <li>
        <a href="" onClick={handleLogout}>log out</a>
      </li>
    </ul>
  );
};

const NavbarTop = () => {

  const userCtx = useContext(UserContext);

  return (
    <nav className={style}>
      <div className="left">
        <Link to={Router.getRoute('homepage')}>Can I Kick It</Link>
      </div>
      <div className="right">
        {userCtx.user ? <MenuAuth user={userCtx.user} /> : <MenuDefault />}
      </div>
    </nav>
  );
}
 
export default NavbarTop;
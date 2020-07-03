import React, { useContext } from 'react';
import style from './style';
import Auth from '../../lib/Auth';
import Backend from '../../lib/Backend';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../domains/Users/Context/UserContext';
import Axios from 'axios';

const MenuDefault = () => {
  return (
    <ul className="menu">
      <li>
        <Link to="/register">register</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
    </ul>
  );
};

const MenuAuth = ({user}) => {

  const history = useHistory();
  const userCtx = useContext(UserContext);

  async function logout() {
    try {
      const url = Backend.getRoute('users.logout');
      Axios.get(url);
      userCtx.initUser(null);
      history.push('/', {hasLogout: true});
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
        <Link to="/users/edit">edit</Link>
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
        <Link to="/">Can I Kick It</Link>
      </div>
      <div className="right">
        {userCtx.user ? <MenuAuth user={userCtx.user} /> : <MenuDefault />}
      </div>
    </nav>
  );
}
 
export default NavbarTop;
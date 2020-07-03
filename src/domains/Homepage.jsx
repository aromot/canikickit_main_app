import React from 'react';
import { Link } from 'react-router-dom';
import Router from '../lib/Router';

const Homepage = () => {
  return (
    <div>
      <h1>Can I Kick It</h1>
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
    </div>
  );
}
 
export default Homepage;
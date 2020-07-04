import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Router from '../lib/Router';
import Backend from '../lib/Backend';
import Axios from 'axios';

const installRoles = async () => {
  const response = await Axios.get(Backend.getRoute('roles.install'));
  return response.data;
}

const Homepage = () => {

  const backendData = Backend.getInitData();
  const [rolesInstalled, setRolesInstalled] = useState(backendData.rolesInstalled);

  const handleMakeRoles = async evt => {
    evt.preventDefault();
    try {
      const data = await installRoles();
      if(data.error) {
        alert(data.error);
      } else {
        Backend.removeData('rolesInstalled');
        alert(data.roles ? data.roles.length + " role(s) installed." : "Roles installed.");
        setRolesInstalled(true);
      }
    } catch (error) {
      alert("An error occurred: "+error.toString());
    }
  };

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
        {rolesInstalled === false && 
          <li>
            <a href="" onClick={handleMakeRoles}>install roles</a>
          </li>
        }
      </ul>
    </div>
  );
}
 
export default Homepage;
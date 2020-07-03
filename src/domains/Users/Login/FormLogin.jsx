import React, { useState, useEffect, useContext } from 'react';
import Backend from '../../../lib/Backend';
import Axios from 'axios';
import MessageBanner from '../../../components/MessageBanner/MessageBanner';
import UserContext from '../Context/UserContext';
import { useHistory } from 'react-router-dom';
import Router from '../../../lib/Router';
import Input from '../../../components/Forms/Input';

const FormLogin = () => {

  const [values, setValues] = useState({
    usernameEmail: 'roger@gmail.com',
    password: 'azerty'
  });
  const [state, setState] = useState({
    status: 'init'
  });

  const userCtx = useContext(UserContext);
  const history = useHistory();

  async function submitForm(evt) {

    evt.preventDefault();
    setState({status: 'submitting'});

    try {
      const url = Backend.getRoute('users.login');
      const response = await Axios.post(url, values);
      if(response.data.error)
      {
        setState({status: 'error', error: response.data.error});
      } else {
        userCtx.initUser(response.data.user);
        history.push(Router.getRoute('homepage'), {hasLogin: true});
      }
    } catch (error) {
      console.error(error);
      setState({status: 'error', error: "Une erreur s'est produite, essayez à nouveau plus tard."});
    }
  }

  const handleChange = evt => {
    setValues({...values, ...{[evt.target.name]: evt.target.value}})
  }

  return (
    <form style={{width: 300}} onSubmit={submitForm}>

      {state.status === 'error' && <MessageBanner type="error">{state.error}</MessageBanner>}

      <Input name="usernameEmail" value={values.usernameEmail} onChange={handleChange}>User name or email</Input>
      <Input type="password" name="password" value={values.password} onChange={handleChange}>Password</Input>
      
      <div>
        <button type="submit" className="btn" disabled={state.status === 'submitting'}>
          S'authentifier
        </button>
      </div>
    </form>
  );
}
 
export default FormLogin;
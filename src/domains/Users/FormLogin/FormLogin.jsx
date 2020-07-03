import React, { useState, useEffect, useContext } from 'react';
import Backend from '../../../lib/Backend';
import Axios from 'axios';
import MessageBanner from '../../../components/MessageBanner/MessageBanner';
import UserContext from '../Context/UserContext';
import { useHistory } from 'react-router-dom';

const FormLogin = () => {

  const [values, setValues] = useState({
    usernameEmail: 'roger@gmail.com',
    password: 'azerty'
    // password: 'azertyyyyyyyyyyyyyyyyyyyyyyy'
  });
  const [state, setState] = useState({
    status: 'init'
  });

  const userCtx = useContext(UserContext);
  const history = useHistory();

  const Input = ({label, name, type='text'}) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input 
          value={values[name]} type={type} className="form-control" onChange={evt => {
          setValues({...values, ...{[name]: evt.target.value}})
        }} />
      </div>
    )
  };

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
        history.push('/', {hasLogin: true});
      }
    } catch (error) {
      console.error(error);
      setState({status: 'error', error: "Une erreur s'est produite, essayez à nouveau plus tard."});
    }
  }

  return (
    <form style={{width: 300}} onSubmit={submitForm}>

      {state.status === 'error' && <MessageBanner type="error">{state.error}</MessageBanner>}

      <Input label="User name or email" name="usernameEmail" />
      <Input label="Password" type="password" name="password" />
      
      <div>
        <button type="submit" className="btn" disabled={state.status === 'submitting'}>
          S'authentifier
        </button>
      </div>
    </form>
  );
}
 
export default FormLogin;
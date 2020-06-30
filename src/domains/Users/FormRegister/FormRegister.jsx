import React, { useState, useEffect } from 'react';
import Backend from '../../../lib/Backend';
import Axios from 'axios';
import MessageBanner from '../../../components/MessageBanner/MessageBanner';

const FormRegister = () => {

  const [values, setValues] = useState({
    username: 'Roger',
    email: 'roger@gmail.com',
    password: 'azerty'
  });
  const [state, setState] = useState({
    status: 'init'
  });

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
      const url = Backend.getRoute('users.register')
      const response = await Axios.post(url, values);
      console.log(response.data);
      setState({status: 'success'});
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    return () => {
      setState({status: 'init'});
    }
  }, []);

  console.log('status:', state.status, values);

  return (
    <form style={{width: 300}}>
      <h1>Inscription</h1>

      {state.status === 'success' && <MessageBanner type="success">Inscription réussie</MessageBanner>}

      <Input label="User name" name="username" />
    
      <Input label="Email" type="email" name="email" />
    
      <Input label="Password" type="password" name="password" />
      
      <div>
        <button type="submit" className="btn" onClick={submitForm} disabled={state.status === 'submitting'}>Inscription</button>
      </div>
    </form>
  );
}
 
export default FormRegister;
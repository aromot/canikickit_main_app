import React, { useState, useEffect } from 'react';
import Backend from '../../../lib/Backend';
import Axios from 'axios';
import MessageBanner from '../../../components/MessageBanner/MessageBanner';
import Input from '../../../components/Forms/Input';

const FormRegister = () => {

  const [values, setValues] = useState({
    username: 'Roger',
    email: 'roger@gmail.com',
    password: 'azerty'
  });
  const [state, setState] = useState({status: 'init'});

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

  const handleChange = evt => {
    setValues({...values, ...{[evt.target.name]: evt.target.value}})
  }

  return (
    <form style={{width: 300}} onSubmit={submitForm}>

      {state.status === 'success' && <MessageBanner type="success">Inscription réussie</MessageBanner>}

      <Input name="username" onChange={handleChange} value={values.username}>User name</Input>
      <Input type="email" name="email" onChange={handleChange} value={values.email}>Email</Input>
      <Input type="password" name="password" onChange={handleChange} value={values.password}>Password</Input>
      
      <div>
        <button type="submit" className="btn" disabled={state.status === 'submitting'}>Inscription</button>
      </div>
    </form>
  );
}
 
export default FormRegister;
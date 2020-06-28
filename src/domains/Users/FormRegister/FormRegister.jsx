import React, { useState } from 'react';
import Backend from '../../../lib/Backend';
import Axios from 'axios';

const FormRegister = () => {

  const [state, setState] = useState({
    username: 'Roger',
    email: 'roger@gmail.com',
    password: 'azerty'
  });

  const Input = ({label, name, type='text'}) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input 
          value={state[name]} type={type} className="form-control" onChange={evt => {
          setState({...state, ...{[name]: evt.target.value}})
        }} />
      </div>
    )
  };

  async function submitForm(evt) {
    evt.preventDefault();
    try {
      const url = Backend.getRoute('users.register')
      const response = await Axios.post(url);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form style={{width: 300}}>
      <h1>Inscription</h1>

      <Input label="User name" name="username" />
    
      <Input label="Email" type="email" name="email" />
    
      <Input label="Password" type="password" name="password" />
      
      <div>
        <button type="submit" className="btn" onClick={submitForm}>Inscription</button>
      </div>
    </form>
  );
}
 
export default FormRegister;
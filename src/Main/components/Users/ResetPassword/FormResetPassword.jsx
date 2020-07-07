import React, { useState } from 'react';
import Backend from '../../../../lib/Backend';
import Axios from 'axios';
import Input from '../../../../components/Forms/Input';
import MessageBanner from '../../../../components/MessageBanner/MessageBanner';
import { useHistory } from 'react-router-dom';
import Router from '../../../../lib/Router';

const FormResetPassword = ({resetKey}) => {

  const history = useHistory();
  const [values, setValues] = useState({
    resetKey,
    new_password: '',
    new_password_confirmation: ''
  });
  const [state, setState] = useState({status: 'init'});

  async function submitForm(evt) {

    evt.preventDefault();
    setState({status: 'submitting'});

    try {
      const url = Backend.getRoute('users.resetPassword')
      const response = await Axios.post(url, values);

      if(response.data.error) {
        setState({status: 'error', error: response.data.error, field_error: response.data.field || ''});
      } else {
        history.push(Router.getRoute('userLogin'))
      }
    } catch (error) {
      console.error(error);
      setState({status: 'error', error: 'A technical error occurred, come back later and try again.'});
    }
  }

  const handleChange = evt => {
    setValues({...values, ...{[evt.target.name]: evt.target.value}})
  }

  return (
    <form style={{width: 300}} onSubmit={submitForm}>

      {state.status === 'error' && ! state.field_error && <MessageBanner type="error">{state.error}</MessageBanner>}

      <Input type="password" name="new_password" onChange={handleChange} value={values.new_password}>New password</Input>
      <Input type="password" name="new_password_confirmation" onChange={handleChange} value={values.new_password_confirmation}>Confirm your new password</Input>

      <div>
        <button type="submit" className="btn" disabled={state.status === 'submitting'}>Envoyer</button>
      </div>
    </form>
  );
}
 
export default FormResetPassword;
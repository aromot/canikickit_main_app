import React, { useState } from 'react';
import Input from '../../../../components/Forms/Input';
import Backend from '../../../../lib/Backend';
import Axios from 'axios';
import MessageBanner from '../../../../components/MessageBanner/MessageBanner';

const FormForgotPassword = () => {

  const [values, setValues] = useState({email: 'roger@gmail.com'});
  const [state, setState] = useState({status: 'init'});

  async function submitForm(evt) {

    evt.preventDefault();
    setState({status: 'submitting'});

    try {
      const url = Backend.getRoute('users.sendPasswordReset')
      await Axios.post(url, values);
      setState({status: 'success'});
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

      {state.status === 'success' && <MessageBanner type="success">Votre demande a été traiée, consultez votre adresse e-mail pour en savoir plus.</MessageBanner>}
      {state.status === 'error' && ! state.field_error && <MessageBanner type="error">{state.error}</MessageBanner>}

      <Input type="email" name="email" onChange={handleChange} value={values.email}>Email</Input>

      <div>
        <button type="submit" className="btn" disabled={state.status === 'submitting'}>Envoyer</button>
      </div>
    </form>
  );
}
 
export default FormForgotPassword;
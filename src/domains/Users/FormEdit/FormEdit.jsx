import React, { useState, useEffect, useContext, useRef } from 'react';
import Backend from '../../../lib/Backend';
import Axios from 'axios';
import MessageBanner from '../../../components/MessageBanner/MessageBanner';
import UserContext from '../Context/UserContext';

const Input = ({children, name, value, type='text', error, onChange}) => {

  const ref = useRef();

  const cn = ['form-group'];
  error && cn.push('error');

  const _onChange = e => {
    onChange(e);
    ref.current.classList.remove('error');
  }

  return (
    <div className={cn.join(' ')} ref={ref}>
      <label>{children}</label>
      <input name={name} value={value} type={type} className="form-control" onChange={_onChange} />
      {error && <div className="form-validation-error">{error}</div>}
    </div>
  )
};

const FormEdit = () => {

  const userCtx = useContext(UserContext);

  const [values, setValues] = useState({
    username: userCtx.user.username,
    email: userCtx.user.email,
    password: '',
    new_password: '',
    new_password_confirm: ''
  });
  const [state, setState] = useState({
    status: 'init'
  });

  async function submitForm(evt) {

    evt.preventDefault();
    setState({status: 'submitting'});

    try {
      const url = Backend.getRoute('users.edit')
      const response = await Axios.post(url, values);

      if(response.data.error) {
        setState({status: 'error', error: response.data.error, field_error: response.data.field || ''});
      } else {
        // setState({status: 'success'});
        document.body.classList.add('show-success');
        userCtx.initUser({...response.data.user});
      }
      
    } catch (error) {
      console.error(error);
      setState({status: 'error', error: 'A technical error occurred, come back later and try again.'});
    }
  }

  useEffect(() => {
    document.body.classList.remove('show-success');
    // return () => {
      // userCtx.initUser({...userCtx.user, edited: false});
      // setState({status: 'init'});
    // }
  }, []);

  const handleChange = evt => {
    setValues({...values, ...{[evt.target.name]: evt.target.value}})
  };

  const getError = name => {
    return (state.status === 'error' && state.field_error === name) ? state.error : '';
  }

  return (
    <form style={{width: 300}} onSubmit={submitForm}>

      {document.body.classList.contains('show-success') && <MessageBanner type="success">Vos informations ont bien été mises à jour.</MessageBanner>}
      {state.status === 'error' && ! state.field_error && <MessageBanner type="error">{state.error}</MessageBanner>}

      <Input name="username" value={values.username} onChange={handleChange}>User name</Input>
      <Input type="email" name="email" value={values.email} onChange={handleChange}>Email</Input>
      <Input type="password" name="password" value={values.password} onChange={handleChange} error={getError('password')}>
        Current password</Input>
      <Input type="password" name="new_password" value={values.new_password} onChange={handleChange}>New password</Input>
      <Input type="password" name="new_password_confirm" value={values.new_password_confirm} onChange={handleChange}>New password confirmation</Input>
      
      <div>
        <button type="submit" className="btn" disabled={state.status === 'submitting'}>Edit</button>
      </div>
    </form>
  );
}
 
export default FormEdit;